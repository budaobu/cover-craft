import { useState } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Github, ListRestart, Share2, Upload } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface CoverSize {
  width: number;
  height: number;
  label: string;
}

const PRESET_SIZES: CoverSize[] = [
  { width: 730, height: 310, label: '个人博客 (730x310)' },
  { width: 1200, height: 630, label: '社交媒体 (1200x630)' },
  { width: 1920, height: 1080, label: '全高清 (1920x1080)' },
  { width: 800, height: 600, label: '文章封面 (800x600)' },
  { width: 1080, height: 1080, label: 'Instagram (1080x1080)' }
];

export default function Generator() {
  // 状态管理
  const [title, setTitle] = useState('输入标题预览效果');
  // 尺寸设置
  const [selectedSize, setSelectedSize] = useState<CoverSize>(PRESET_SIZES[0]);
  const [customWidth, setCustomWidth] = useState(1200);
  const [customHeight, setCustomHeight] = useState(630);
  const [isCustomSize, setIsCustomSize] = useState(false);

  const [fontSize, setFontSize] = useState(90);
  const [fontFamily, setFontFamily] = useState('"ZCOOL QingKe HuangYou", cursive');
  const [letterSpacing, setLetterSpacing] = useState(10);
  const [backgroundColor, setBackgroundColor] = useState('#022D3D');
  const [textColor, setTextColor] = useState('#ffffff');
  const [gradientStart, setGradientStart] = useState('#4f46e5');
  const [gradientEnd, setGradientEnd] = useState('#818cf8');
  const [gradientAngle, setGradientAngle] = useState(45);
  const [backgroundType, setBackgroundType] = useState('solid');
  const [borderRadius, setBorderRadius] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundSize, setBackgroundSize] = useState<'cover' | 'contain'>('cover');
  const [backgroundPosition, setBackgroundPosition] = useState('center');
  // 字体设置
  const [fontWeight, setFontWeight] = useState(500);

  // 重置设置
  const resetSettings = () => {
    setTitle('输入标题预览效果');
    setFontSize(90);
    setLetterSpacing(10);
    setFontFamily('"ZCOOL QingKe HuangYou", cursive');
    setBackgroundColor('#022D3D');
    setTextColor('#ffffff');
    setGradientStart('#4f46e5');
    setGradientEnd('#818cf8');
    setGradientAngle(45);
    setBackgroundType('solid');
    setBorderRadius(0);
    setBackgroundImage('');
    setBackgroundSize('cover');
    setBackgroundPosition('center');
  };

  // 添加字体配置
  const FONT_FAMILIES = [
    { value: 'sans-serif', label: 'Sans Serif' },
    { value: 'serif', label: 'Serif' },
    { value: 'monospace', label: 'Monospace' },
    { value: 'Pacifico, cursive', label: 'Pacifico' },
    { value: 'Dancing Script, cursive', label: 'Dancing Script' },
    { value: 'Great Vibes, cursive', label: 'Great Vibes' },
    { value: 'Satisfy, cursive', label: 'Satisfy' },
    // 中文字体
    { value: '"Noto Serif SC", serif', label: '思源宋体' },
    { value: '"ZCOOL XiaoWei", serif', label: '站酷小薇' },
    { value: '"ZCOOL QingKe HuangYou", cursive', label: '站酷庆科黄油体' },
    { value: '"Ma Shan Zheng", cursive', label: '马善政楷书' }
  ];

  // 添加图片上传处理函数
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 计算背景样式
  const computedBackgroundStyle = () => {
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

  // 导出图片
  const exportImage = async (format: 'png' | 'jpeg' | 'webp' | 'avif') => {
    const element = document.getElementById('cover-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // 提高导出质量
        backgroundColor: backgroundType === 'transparent' ? null : undefined
      });

      // 根据格式导出
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

  return (
    <div className="h-screen min-w-[1000px] overflow-hidden">
      <div className="border-b">
        <div className="flex h-16 justify-between items-center gap-4 px-4">
          <div className="text-sm text-lg font-bold">封面生成器</div>
          <div className="flex items-center space-x-2">
            {/* 添加 GitHub 按钮 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('https://github.com/guizimo/cover-craft', '_blank')}
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={resetSettings}>
              <ListRestart className="mr-2 h-4 w-4" />
              重置
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              分享
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  导出
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => exportImage('png')}>PNG 格式</DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportImage('jpeg')}>JPEG 格式</DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportImage('webp')}>WebP 格式</DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportImage('avif')}>AVIF 格式</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <ResizablePanelGroup direction="horizontal">
        {/* 左侧配置面板 */}
        <ResizablePanel defaultSize={30} minSize={30} maxSize={30}>
          <div className="flex h-[calc(100vh-4rem)] flex-col">
            <div className="flex-1 overflow-auto">
              <div className="space-y-6 p-4">
                {/* 标题设置 */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">标题</h3>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="输入标题" />
                  </div>
                </div>

                {/* 尺寸设置 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">封面尺寸</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Select
                          value={isCustomSize ? 'custom' : `${selectedSize.width}x${selectedSize.height}`}
                          onValueChange={(value) => {
                            if (value === 'custom') {
                              setIsCustomSize(true);
                            } else {
                              setIsCustomSize(false);
                              const size = PRESET_SIZES.find((s) => `${s.width}x${s.height}` === value);
                              if (size) setSelectedSize(size);
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="选择尺寸" />
                          </SelectTrigger>
                          <SelectContent>
                            {PRESET_SIZES.map((size) => (
                              <SelectItem key={`${size.width}x${size.height}`} value={`${size.width}x${size.height}`}>
                                {size.label}
                              </SelectItem>
                            ))}
                            <SelectItem value="custom">自定义尺寸</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {isCustomSize && (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label className="text-muted-foreground">宽度</Label>
                            <div className="flex space-x-2">
                              <Input
                                type="number"
                                value={customWidth}
                                onChange={(e) => setCustomWidth(Number(e.target.value))}
                                min={100}
                                max={3840}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-muted-foreground">高度</Label>
                            <div className="flex space-x-2">
                              <Input
                                type="number"
                                value={customHeight}
                                onChange={(e) => setCustomHeight(Number(e.target.value))}
                                min={100}
                                max={2160}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 字体设置 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">字体设置</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">字体</Label>
                      <Select value={fontFamily} onValueChange={setFontFamily}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择字体" />
                        </SelectTrigger>
                        <SelectContent>
                          {FONT_FAMILIES.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              <span style={{ fontFamily: value }}>{label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">字体大小</Label>
                      <div className="flex items-center space-x-2">
                        <Slider
                          value={[fontSize]}
                          onValueChange={([value]) => setFontSize(value)}
                          min={20}
                          max={200}
                          step={1}
                          className="flex-1"
                        />
                        <span className="w-12 text-sm text-muted-foreground text-right">{fontSize}px</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">字间距</Label>
                      <div className="flex items-center space-x-2">
                        <Slider
                          value={[letterSpacing]}
                          onValueChange={([value]) => setLetterSpacing(value)}
                          min={-10}
                          max={30}
                          step={0.5}
                          className="flex-1"
                        />
                        <span className="w-12 text-sm text-muted-foreground text-right">{letterSpacing}px</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">字重</Label>
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          value={fontWeight}
                          onChange={(e) => setFontWeight(Number(e.target.value))}
                          min={100}
                          max={900}
                          step={100}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">文字颜色</Label>
                      <div className="flex space-x-2">
                        <Input value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                        <div className="relative w-10">
                          <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                          />
                          <div className="w-full h-full rounded-md border" style={{ backgroundColor: textColor }} />
                        </div>
                      </div>
                    </div>
                    {/* ... 其他字体设置 ... */}
                  </div>
                </div>

                {/* 背景设置 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">背景设置</h3>
                  </div>
                  <div className="space-y-4">
                    <Tabs value={backgroundType} onValueChange={setBackgroundType}>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">模式</Label>
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="solid">纯色</TabsTrigger>
                          <TabsTrigger value="gradient">渐变</TabsTrigger>
                          <TabsTrigger value="image">图片</TabsTrigger>
                          <TabsTrigger value="transparent">透明</TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent value="solid" className="space-y-2">
                        <div className="space-y-2">
                          <Label className="text-muted-foreground">背景颜色</Label>
                          <div className="flex space-x-2">
                            <Input value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                            <div className="relative w-10">
                              <input
                                type="color"
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                              />
                              <div className="w-full h-full rounded-md border" style={{ backgroundColor }} />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="gradient" className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-muted-foreground">起始颜色</Label>
                          <div className="flex space-x-2">
                            <Input value={gradientStart} onChange={(e) => setGradientStart(e.target.value)} />
                            <div className="relative w-10">
                              <input
                                type="color"
                                value={gradientStart}
                                onChange={(e) => setGradientStart(e.target.value)}
                                className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                              />
                              <div
                                className="w-full h-full rounded-md border"
                                style={{ backgroundColor: gradientStart }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-muted-foreground">结束颜色</Label>
                          <div className="flex space-x-2">
                            <Input value={gradientEnd} onChange={(e) => setGradientEnd(e.target.value)} />
                            <div className="relative w-10">
                              <input
                                type="color"
                                value={gradientEnd}
                                onChange={(e) => setGradientEnd(e.target.value)}
                                className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                              />
                              <div
                                className="w-full h-full rounded-md border"
                                style={{ backgroundColor: gradientEnd }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-muted-foreground">渐变角度</Label>
                          <div className="flex items-center space-x-2">
                            <Slider
                              value={[gradientAngle]}
                              onValueChange={([value]) => setGradientAngle(value)}
                              min={0}
                              max={360}
                              step={1}
                            />
                            <span className="w-12 text-sm text-muted-foreground text-right">{gradientAngle}°</span>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="image" className="space-y-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <Label className="text-muted-foreground">本地上传</Label>
                              <div className="mt-2">
                                <div className="flex items-center justify-center w-full">
                                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                      <p className="text-sm text-muted-foreground">点击上传图片</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-2">
                              <Label className="text-muted-foreground">图片链接</Label>
                              <div className="mt-2">
                                <Input
                                  placeholder="输入图片链接"
                                  value={backgroundImage}
                                  onChange={(e) => setBackgroundImage(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-muted-foreground">图片填充方式</Label>
                            <Select value={backgroundSize} onValueChange={(value: 'cover' | 'contain') => setBackgroundSize(value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="选择填充方式" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cover">填充</SelectItem>
                                <SelectItem value="contain">适应</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    {/* ... 背景设置内容 ... */}
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">背景圆角大小</Label>
                      <div className="flex items-center space-x-2">
                        <Slider
                          value={[borderRadius]}
                          onValueChange={([value]) => setBorderRadius(value)}
                          min={0}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <span className="w-12 text-sm text-muted-foreground text-right">{borderRadius}px</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        {/* 右侧预览区域 */}
        <ResizablePanel defaultSize={75}>
          <div className="flex h-[calc(100vh-4rem)] flex-col">
            <div className="flex-1 overflow-auto bg-muted/40">
              <div className="flex h-full items-center justify-center p-6">
                <div
                  id="cover-preview"
                  className="border-0 flex items-center justify-center relative overflow-hidden"
                  style={{
                    width: isCustomSize ? customWidth : selectedSize.width,
                    height: isCustomSize ? customHeight : selectedSize.height,
                    borderRadius: `${borderRadius}px`,
                    ...computedBackgroundStyle()
                  }}
                >
                  <div
                    className="text-center p-8 transition-all"
                    style={{
                      fontSize: `${fontSize}px`,
                      fontFamily,
                      fontWeight,
                      color: textColor,
                      letterSpacing: `${letterSpacing}px`
                    }}
                  >
                    {title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
