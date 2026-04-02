/**
 * Audio format conversion utility
 * Converts WebM audio (from MediaRecorder) to MP3 format for API compatibility
 */

let ffmpegLoaded = false
let ffmpegInstance: any = null

/**
 * Initialize FFmpeg (lazy load - only load when needed)
 */
async function loadFFmpeg() {
  if (ffmpegLoaded && ffmpegInstance) {
    return ffmpegInstance
  }

  console.log('[DEBUG] Loading FFmpeg for audio conversion...')
  // Dynamic import to avoid loading on initial page load
  const ffmpegModule = await import('@ffmpeg/ffmpeg')
  console.log('[DEBUG] FFmpeg module imported:', { 
    hasFFmpeg: !!ffmpegModule.FFmpeg,
    hasCreateFFmpeg: !!ffmpegModule.createFFmpeg,
    hasDefault: !!ffmpegModule.default,
    keys: Object.keys(ffmpegModule)
  })
  
  // Try different import patterns
  let FFmpegClass
  if (ffmpegModule.FFmpeg) {
    FFmpegClass = ffmpegModule.FFmpeg
  } else if (ffmpegModule.default && ffmpegModule.default.FFmpeg) {
    FFmpegClass = ffmpegModule.default.FFmpeg
  } else if (ffmpegModule.default) {
    FFmpegClass = ffmpegModule.default
  } else if (ffmpegModule.createFFmpeg) {
    // Fallback to old API if available
    console.warn('[DEBUG] Using deprecated createFFmpeg API')
    const createFFmpeg = ffmpegModule.createFFmpeg
    const ffmpeg = createFFmpeg({ log: true })
    await ffmpeg.load()
    ffmpegLoaded = true
    ffmpegInstance = ffmpeg
    console.log('[DEBUG] FFmpeg loaded successfully (legacy API)')
    return ffmpeg
  } else {
    throw new Error(`FFmpeg not found in module. Available exports: ${Object.keys(ffmpegModule).join(', ')}`)
  }
  
  const ffmpeg = new FFmpegClass()
  
  // Set up logging
  ffmpeg.on('log', ({ message }) => {
    console.log('[FFmpeg]', message)
  })
  
  // Load FFmpeg core (will download from CDN if needed)
  // Note: For version 0.12.x, the load method might not need parameters
  // or might use different options. If this fails, remove the options object.
  try {
    await ffmpeg.load()
  } catch (loadError: any) {
    console.error('[DEBUG] FFmpeg load failed, trying with explicit coreURL:', loadError)
    // If default load fails, try with explicit core URL
    await ffmpeg.load({
      coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js'
    })
  }
  
  ffmpegLoaded = true
  ffmpegInstance = ffmpeg
  
  console.log('[DEBUG] FFmpeg loaded successfully')
  return ffmpeg
}

/**
 * Convert WebM audio blob to MP3
 * @param webmBlob - The WebM audio blob from MediaRecorder
 * @returns MP3 audio blob
 */
export async function convertWebmToMp3(webmBlob: Blob): Promise<Blob> {
  try {
    const ffmpeg = await loadFFmpeg()
    
    const inputFileName = 'input.webm'
    const outputFileName = 'output.mp3'

    // Write the WebM blob to FFmpeg's virtual filesystem
    const { fetchFile, toBlobURL } = await import('@ffmpeg/util')
    const webmData = await fetchFile(webmBlob)
    await ffmpeg.writeFile(inputFileName, webmData)

    // Convert WebM to MP3
    // -i: input file
    // -vn: disable video (audio only)
    // -c:a libmp3lame: use MP3 encoder
    // -b:a 192k: audio bitrate (192 kbps)
    // -ar 44100: sample rate (44.1 kHz)
    // -ac 1: mono channel (or 2 for stereo)
    // Try exec() first, if it doesn't exist, use run()
    if (typeof ffmpeg.exec === 'function') {
      await ffmpeg.exec([
        '-i', inputFileName,
        '-vn',
        '-c:a', 'libmp3lame',
        '-b:a', '192k',
        '-ar', '44100',
        '-ac', '1',
        outputFileName
      ])
    } else if (typeof ffmpeg.run === 'function') {
      await ffmpeg.run(
        '-i', inputFileName,
        '-vn',
        '-c:a', 'libmp3lame',
        '-b:a', '192k',
        '-ar', '44100',
        '-ac', '1',
        outputFileName
      )
    } else {
      throw new Error('FFmpeg instance does not have exec() or run() method')
    }

    // Read the MP3 file from FFmpeg's virtual filesystem
    const mp3Data = await ffmpeg.readFile(outputFileName)
    
    // Clean up virtual filesystem
    await ffmpeg.deleteFile(inputFileName)
    await ffmpeg.deleteFile(outputFileName)

    // Create MP3 blob
    // readFile returns Uint8Array, convert to Blob
    const mp3Blob = new Blob([mp3Data], { type: 'audio/mpeg' })
    
    return mp3Blob
  } catch (error: any) {
    console.error('Error converting WebM to MP3:', error)
    throw new Error(`Failed to convert audio to MP3: ${error?.message || 'Unknown error'}`)
  }
}

/**
 * Check if audio blob needs conversion (if it's not MP3)
 */
export function needsConversion(audioBlob: Blob): boolean {
  return !audioBlob.type.includes('mp3') && !audioBlob.type.includes('mpeg')
}
