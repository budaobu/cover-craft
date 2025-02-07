import { create } from 'zustand';
import { DEFAULT_SETTINGS, CoverSize } from '@/config/generator';

interface GeneratorState {
  // 标题
  title: string;
  setTitle: (title: string) => void;
  
  // 尺寸
  selectedSize: CoverSize;
  setSelectedSize: (size: CoverSize) => void;
  customWidth: number;
  setCustomWidth: (width: number) => void;
  customHeight: number;
  setCustomHeight: (height: number) => void;
  isCustomSize: boolean;
  setIsCustomSize: (isCustom: boolean) => void;
  
  // 字体
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (family: string) => void;
  letterSpacing: number;
  setLetterSpacing: (spacing: number) => void;
  fontWeight: number;
  setFontWeight: (weight: number) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  
  // 背景
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  gradientStart: string;
  setGradientStart: (color: string) => void;
  gradientEnd: string;
  setGradientEnd: (color: string) => void;
  gradientAngle: number;
  setGradientAngle: (angle: number) => void;
  backgroundType: string;
  setBackgroundType: (type: string) => void;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
  backgroundImage: string;
  setBackgroundImage: (image: string) => void;
  backgroundSize: 'cover' | 'contain';
  setBackgroundSize: (size: 'cover' | 'contain') => void;
  backgroundPosition: string;
  setBackgroundPosition: (position: string) => void;
  
  // 重置
  resetSettings: () => void;
}

export const useGeneratorStore = create<GeneratorState>((set) => ({
  // 标题
  title: DEFAULT_SETTINGS.title,
  setTitle: (title) => set({ title }),
  
  // 尺寸
  selectedSize: DEFAULT_SETTINGS.selectedSize,
  setSelectedSize: (size) => set({ selectedSize: size }),
  customWidth: DEFAULT_SETTINGS.customWidth,
  setCustomWidth: (width) => set({ customWidth: width }),
  customHeight: DEFAULT_SETTINGS.customHeight,
  setCustomHeight: (height) => set({ customHeight: height }),
  isCustomSize: false,
  setIsCustomSize: (isCustom) => set({ isCustomSize: isCustom }),
  
  // 字体
  fontSize: DEFAULT_SETTINGS.fontSize,
  setFontSize: (size) => set({ fontSize: size }),
  fontFamily: DEFAULT_SETTINGS.fontFamily,
  setFontFamily: (family) => set({ fontFamily: family }),
  letterSpacing: DEFAULT_SETTINGS.letterSpacing,
  setLetterSpacing: (spacing) => set({ letterSpacing: spacing }),
  fontWeight: DEFAULT_SETTINGS.fontWeight,
  setFontWeight: (weight) => set({ fontWeight: weight }),
  textColor: DEFAULT_SETTINGS.textColor,
  setTextColor: (color) => set({ textColor: color }),
  
  // 背景
  backgroundColor: DEFAULT_SETTINGS.backgroundColor,
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  gradientStart: DEFAULT_SETTINGS.gradientStart,
  setGradientStart: (color) => set({ gradientStart: color }),
  gradientEnd: DEFAULT_SETTINGS.gradientEnd,
  setGradientEnd: (color) => set({ gradientEnd: color }),
  gradientAngle: DEFAULT_SETTINGS.gradientAngle,
  setGradientAngle: (angle) => set({ gradientAngle: angle }),
  backgroundType: DEFAULT_SETTINGS.backgroundType,
  setBackgroundType: (type) => set({ backgroundType: type }),
  borderRadius: DEFAULT_SETTINGS.borderRadius,
  setBorderRadius: (radius) => set({ borderRadius: radius }),
  backgroundImage: '',
  setBackgroundImage: (image) => set({ backgroundImage: image }),
  backgroundSize: DEFAULT_SETTINGS.backgroundSize,
  setBackgroundSize: (size) => set({ backgroundSize: size }),
  backgroundPosition: DEFAULT_SETTINGS.backgroundPosition,
  setBackgroundPosition: (position) => set({ backgroundPosition: position }),
  
  // 重置
  resetSettings: () => set({
    title: DEFAULT_SETTINGS.title,
    fontSize: DEFAULT_SETTINGS.fontSize,
    letterSpacing: DEFAULT_SETTINGS.letterSpacing,
    fontFamily: DEFAULT_SETTINGS.fontFamily,
    backgroundColor: DEFAULT_SETTINGS.backgroundColor,
    textColor: DEFAULT_SETTINGS.textColor,
    gradientStart: DEFAULT_SETTINGS.gradientStart,
    gradientEnd: DEFAULT_SETTINGS.gradientEnd,
    gradientAngle: DEFAULT_SETTINGS.gradientAngle,
    backgroundType: DEFAULT_SETTINGS.backgroundType,
    borderRadius: DEFAULT_SETTINGS.borderRadius,
    backgroundImage: '',
    backgroundSize: DEFAULT_SETTINGS.backgroundSize,
    backgroundPosition: DEFAULT_SETTINGS.backgroundPosition,
    fontWeight: DEFAULT_SETTINGS.fontWeight
  })
}));