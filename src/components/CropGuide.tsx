import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cropData } from '@/data/soilData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

export const CropGuide = () => {
  const { t } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState('Paddy (Rice)');
  
  const crop = cropData[selectedCrop as keyof typeof cropData];
  const chartData = Object.entries(crop.needs).map(([key, value]) => ({
    nutrient: key,
    value: value,
  }));

  const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">{t('crop.title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t('crop.subtitle')}</p>
      </div>

      <div className="flex justify-center mb-8">
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-[280px] border-2">
            <SelectValue placeholder={t('crop.selectCrop')} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(cropData).map((cropName) => (
              <SelectItem key={cropName} value={cropName}>
                {cropName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-2">
        <CardContent className="p-6 grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">{selectedCrop}</h3>
            <div>
              <h4 className="font-semibold text-lg mb-2">{t('crop.macronutrients')}:</h4>
              <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: crop.macro }} />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">{t('crop.micronutrients')}:</h4>
              <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: crop.micro }} />
            </div>
          </div>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" domain={[0, 3]} hide />
                <YAxis type="category" dataKey="nutrient" width={120} tick={{ fill: 'hsl(var(--foreground))', fontSize: 14 }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
