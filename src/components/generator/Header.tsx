import { Button } from '@/components/ui/button';
import { Download, Github, ListRestart, Share2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useGeneratorStore } from '@/store/generator';
import { exportImage } from '@/utils/generator';

export function Header() {
  const { resetSettings, backgroundType } = useGeneratorStore();

  return (
    <div className="border-b">
      <div className="flex h-16 justify-between items-center gap-4 px-4">
        <div className="text-sm text-lg font-bold">封面生成器</div>
        <div className="flex items-center space-x-2">
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
              <DropdownMenuItem onClick={() => exportImage('png', backgroundType)}>PNG 格式</DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportImage('jpeg', backgroundType)}>JPEG 格式</DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportImage('webp', backgroundType)}>WebP 格式</DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportImage('avif', backgroundType)}>AVIF 格式</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}