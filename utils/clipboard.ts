export const copyImageToClipboard = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    if (navigator.clipboard) {
      if (navigator.clipboard.write) {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ]);
      } else if (navigator.clipboard.writeText) {
        // Fallback: Copy the image URL to the clipboard
        await navigator.clipboard.writeText(imageUrl);
      }
      console.log('Image copied to clipboard successfully!');
    }

    return imageUrl;
  } catch (error) {
    console.error('Failed to copy image:', error);
    throw error;
  }
};