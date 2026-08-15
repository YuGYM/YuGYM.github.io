import AppKit
import ImageIO
import UniformTypeIdentifiers

let outputDirectory = FileManager.default.currentDirectoryPath

func makeImage(size: Int) -> CGImage? {
    let colorSpace = CGColorSpaceCreateDeviceRGB()
    guard let context = CGContext(
        data: nil,
        width: size,
        height: size,
        bitsPerComponent: 8,
        bytesPerRow: size * 4,
        space: colorSpace,
        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
    ) else { return nil }

    let bounds = CGRect(x: 0, y: 0, width: size, height: size)
    context.clear(bounds)

    let inset = CGFloat(size) * 0.04
    context.setFillColor(NSColor.black.cgColor)
    context.fillEllipse(in: bounds.insetBy(dx: inset, dy: inset))

    let fontSize = CGFloat(size) * 0.58
    let font = NSFont.systemFont(ofSize: fontSize, weight: .bold)
    let attributes: [NSAttributedString.Key: Any] = [
        .font: font,
        .foregroundColor: NSColor.white
    ]
    let text = NSAttributedString(string: "Y", attributes: attributes)
    let textSize = text.size()
    text.draw(at: CGPoint(x: (CGFloat(size) - textSize.width) / 2,
                          y: (CGFloat(size) - textSize.height) / 2 - CGFloat(size) * 0.03))

    return context.makeImage()
}

func writePNG(_ image: CGImage, name: String) {
    let url = URL(fileURLWithPath: outputDirectory).appendingPathComponent(name)
    guard let destination = CGImageDestinationCreateWithURL(url as CFURL, UTType.png.identifier as CFString, 1, nil) else {
        fatalError("Could not create PNG destination")
    }
    CGImageDestinationAddImage(destination, image, nil)
    guard CGImageDestinationFinalize(destination) else { fatalError("Could not write \(name)") }
}

for size in [16, 32, 48, 192] {
    guard let image = makeImage(size: size) else { fatalError("Could not render image") }
    writePNG(image, name: size == 192 ? "logo.png" : "brand-\(size).png")
}
