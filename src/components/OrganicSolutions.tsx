import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { organicData } from '@/data/soilData';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

export const OrganicSolutions = () => {
  const { t } = useTranslation();
  const [selectedAdditive, setSelectedAdditive] = useState('reset');
  
  const additive = organicData.additives[selectedAdditive as keyof typeof organicData.additives];
  const finalNutrients = { ...organicData.base.nutrients, ...additive.nutrientBoost };
  const chartData = Object.entries(finalNutrients).map(([key, value]) => ({
    nutrient: key,
    value: value,
  }));

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">{t('organic.title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t('organic.subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(organicData.additives).map(([id, data]) => (
          <Card
            key={id}
            className={`cursor-pointer transition-smooth border-2 ${
              selectedAdditive === id ? 'border-primary bg-primary/5 shadow-lg' : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedAdditive(id)}
          >
            <CardContent className="p-4 text-center">
              <p className="font-medium text-sm">{data.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2">
        <CardContent className="p-6 grid md:grid-cols-2 gap-6 items-center min-h-[400px]">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              {t('organic.boosts')}: {additive.boosts}
            </h3>
            <p className="text-muted-foreground">{additive.description}</p>
            <div>
              <h4 className="font-semibold text-lg mb-2">{t('organic.base')}:</h4>
              <p className="text-muted-foreground">Cow Dung</p>
            </div>
            {selectedAdditive !== 'reset' && (
              <div>
                <h4 className="font-semibold text-lg mb-2">Additive:</h4>
                <p className="text-muted-foreground">{additive.name.replace('Add ', '')}</p>
              </div>
            )}
          </div>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="nutrient" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                <Radar name={t('organic.nutrientProfile')} dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
