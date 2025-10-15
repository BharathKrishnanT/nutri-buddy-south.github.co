import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { soilData } from '@/data/soilData';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

export const SoilExplorer = () => {
  const { t } = useTranslation();
  const [selectedSoil, setSelectedSoil] = useState('Red Soil');
  
  const soil = soilData[selectedSoil as keyof typeof soilData];
  const chartData = Object.entries(soil.profile).map(([key, value]) => ({
    nutrient: key,
    value: value,
  }));

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">{t('soil.title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t('soil.subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.keys(soilData).map((soilName) => (
          <Card
            key={soilName}
            className={`cursor-pointer transition-smooth border-2 ${
              selectedSoil === soilName ? 'border-primary bg-primary/5 shadow-lg' : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedSoil(soilName)}
          >
            <CardContent className="p-4 text-center">
              <p className="font-medium">{t(`soil.${soilName.toLowerCase().replace(/\s+/g, '')}`, soilName)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2">
        <CardContent className="p-6 grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">{selectedSoil}</h3>
            <div>
              <h4 className="font-semibold text-lg mb-2">{t('soil.characteristics')}:</h4>
              <p className="text-muted-foreground">{soil.characteristics}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">{t('soil.nutrientProfile')}:</h4>
              <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: soil.profileText }} />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">{t('soil.suitableCrops')}:</h4>
              <p className="text-muted-foreground">{soil.crops}</p>
            </div>
          </div>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="nutrient" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                <Radar name={selectedSoil} dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
