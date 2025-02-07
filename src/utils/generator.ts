import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

export const computeBackgroundStyle = (
  backgroundType: string,
  backgroundColor: string,
  gradientStart: string,
  gradientEnd: string,
  gradientAngle: number,
  backgroundImage: string,
  backgroundSize: 'cover' | 'contain',
  backgroundPosition: string
): React.CSSProperties => {
  switch (backgroundType) {
    case 'solid':
      return { backgroundColor };
    case 'gradient':
      return { backgroundImage: `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})` };
    case 'image':
      return {
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize,
        backgroundPosition,
        backgroundRepeat: 'no-repeat'
      };
    case 'transparent':
      return { backgroundColor: 'transparent' };
    default:
      return { backgroundColor };
  }
};

export const handleImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setBackgroundImage: (image: string) => void
) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBackgroundImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
};

export const exportImage = async (
  format: 'png' | 'jpeg' | 'webp' | 'avif',
  backgroundType: string
) => {
  const element = document.getElementById('cover-preview');
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: backgroundType === 'transparent' ? null : undefined
    });

    canvas.toBlob(
      (blob) => {
        if (blob) {
          saveAs(blob, `cover.${format}`);
        }
      },
      `image/${format}`,
      0.95
    );
  } catch (error) {
    console.error('Export failed:', error);
  }
};