import { Input } from '@/components/ui/input';
import { useGeneratorStore } from '@/store/generator';

export function TitleConfig() {
  const { title, setTitle } = useGeneratorStore();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-base font-medium">标题</h3>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="输入标题" />
      </div>
    </div>
  );
}