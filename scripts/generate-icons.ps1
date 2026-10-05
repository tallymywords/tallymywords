# Native Windows Icon Generator for Android & PWA
# Uses Windows built-in .NET System.Drawing (zero dependencies, no node-gyp, no sharp compilation issues)

Add-Type -AssemblyName System.Drawing

$sourceIcon = $null
if (Test-Path "assets/icon.png") {
    $sourceIcon = (Resolve-Path "assets/icon.png").Path
} elseif (Test-Path "icon.png") {
    $sourceIcon = (Resolve-Path "icon.png").Path
} elseif (Test-Path "assets/logo.png") {
    $sourceIcon = (Resolve-Path "assets/logo.png").Path
} elseif (Test-Path "logo.png") {
    $sourceIcon = (Resolve-Path "logo.png").Path
}

if (-not $sourceIcon) {
    Write-Host "[Error] Could not find 'icon.png' or 'assets/icon.png'." -ForegroundColor Red
    Write-Host "Please place your icon file as 'icon.png' in the root project folder or 'assets/icon.png' and run again." -ForegroundColor Yellow
    exit 1
}

Write-Host "Found source icon: $sourceIcon" -ForegroundColor Green

$srcImg = [System.Drawing.Image]::FromFile($sourceIcon)

function Resize-And-Save($src, $targetPath, $width, $height) {
    $dir = Split-Path $targetPath -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    
    $destBitmap = New-Object System.Drawing.Bitmap($width, $height)
    $destBitmap.SetResolution($src.HorizontalResolution, $src.VerticalResolution)
    
    $g = [System.Drawing.Graphics]::FromImage($destBitmap)
    $g.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($src, 0, 0, $width, $height)
    $g.Dispose()
    
    # Save as PNG
    $destBitmap.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destBitmap.Dispose()
    Write-Host "Generated: $targetPath ($($width)x$($height))" -ForegroundColor Cyan
}

# Android standard launcher icons
$densities = @{
    "mipmap-mdpi" = 48
    "mipmap-hdpi" = 72
    "mipmap-xhdpi" = 96
    "mipmap-xxhdpi" = 144
    "mipmap-xxxhdpi" = 192
}

# Android adaptive foreground icons
$adaptiveDensities = @{
    "mipmap-mdpi" = 108
    "mipmap-hdpi" = 162
    "mipmap-xhdpi" = 216
    "mipmap-xxhdpi" = 324
    "mipmap-xxxhdpi" = 432
}

$resDir = "android/app/src/main/res"

foreach ($d in $densities.Keys) {
    $size = $densities[$d]
    Resize-And-Save $srcImg "$resDir/$d/ic_launcher.png" $size $size
    Resize-And-Save $srcImg "$resDir/$d/ic_launcher_round.png" $size $size
}

foreach ($d in $adaptiveDensities.Keys) {
    $size = $adaptiveDensities[$d]
    Resize-And-Save $srcImg "$resDir/$d/ic_launcher_foreground.png" $size $size
}

# Also generate PWA icons
Resize-And-Save $srcImg "public/icon-192.png" 192 192
Resize-And-Save $srcImg "public/icon-512.png" 512 512

$srcImg.Dispose()

Write-Host "`nAll Android and PWA icons generated successfully!" -ForegroundColor Green
Write-Host "Now run: npm run build-apk  to reassemble your APK with the new icon." -ForegroundColor Yellow
