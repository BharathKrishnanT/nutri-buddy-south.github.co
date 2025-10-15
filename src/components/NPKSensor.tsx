import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Wifi, Leaf, Beaker, Sprout } from 'lucide-react';
import { toast } from 'sonner';

interface NPKData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export const NPKSensor = () => {
  const { t } = useTranslation();
  const [npkData, setNpkData] = useState<NPKData | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [fertilizerAmount, setFertilizerAmount] = useState<string>('');
  const [organicMix, setOrganicMix] = useState<any>(null);

  const simulateESP32Reading = async () => {
    setIsReading(true);
    toast.info('Connecting to ESP32...');
    
    // Simulate ESP32 connection and data reading
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate random NPK values (in real app, this would come from ESP32)
    const mockData: NPKData = {
      nitrogen: Math.floor(Math.random() * 100),
      phosphorus: Math.floor(Math.random() * 100),
      potassium: Math.floor(Math.random() * 100),
    };
    
    setNpkData(mockData);
    setIsReading(false);
    toast.success('NPK data received successfully!');
  };

  const getNutrientStatus = (value: number): string => {
    if (value >= 60) return t('npk.optimal');
    if (value >= 30) return t('npk.low');
    return t('npk.veryLow');
  };

  const getNutrientColor = (value: number): string => {
    if (value >= 60) return 'bg-success';
    if (value >= 30) return 'bg-warning';
    return 'bg-destructive';
  };

  const generateOrganicMix = () => {
    if (!npkData || !fertilizerAmount) {
      toast.error('Please enter fertilizer amount');
      return;
    }

    const amount = parseFloat(fertilizerAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    // Base calculation: 1L fertilizer needs ~0.5kg organic matter
    const baseAmount = amount * 0.5;
    
    // Calculate additional amounts based on deficiency
    const nDeficiency = Math.max(0, 60 - npkData.nitrogen) / 100;
    const pDeficiency = Math.max(0, 60 - npkData.phosphorus) / 100;
    const kDeficiency = Math.max(0, 60 - npkData.potassium) / 100;

    const mix = {
      cowDung: baseAmount,
      additives: [] as any[],
    };

    if (nDeficiency > 0.2) {
      mix.additives.push({
        name: 'oil-cake',
        displayName: 'Crop Waste / Oil Cake',
        amount: (baseAmount * nDeficiency * 0.3).toFixed(2),
        boost: 'Nitrogen (N)'
      });
    }

    if (pDeficiency > 0.2) {
      mix.additives.push({
        name: 'bone-meal',
        displayName: 'Bone Meal / Ash',
        amount: (baseAmount * pDeficiency * 0.3).toFixed(2),
        boost: 'Phosphorus (P)'
      });
    }

    if (kDeficiency > 0.2) {
      mix.additives.push({
        name: 'wood-ash',
        displayName: 'Wood Ash',
        amount: (baseAmount * kDeficiency * 0.3).toFixed(2),
        boost: 'Potassium (K)'
      });
    }

    if (mix.additives.length === 0) {
      mix.additives.push({
        name: 'vermicompost',
        displayName: 'Vermicompost',
        amount: (baseAmount * 0.2).toFixed(2),
        boost: 'All-Round Enhancement'
      });
    }

    const total = mix.additives.reduce((sum, add) => sum + parseFloat(add.amount), parseFloat(mix.cowDung.toFixed(2)));
    
    setOrganicMix({ ...mix, total: total.toFixed(2), fertilizerAmount: amount });
    toast.success('Organic mix generated!');
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">{t('npk.title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t('npk.subtitle')}</p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-primary" />
              ESP32 Connection
            </CardTitle>
            <Button 
              onClick={simulateESP32Reading}
              disabled={isReading}
              className="bg-primary hover:bg-primary/90"
            >
              {isReading ? t('npk.reading') : t('npk.readData')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {npkData ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium">
                      <Leaf className="h-4 w-4 text-success" />
                      {t('npk.nitrogen')}
                    </span>
                    <span className="text-sm font-bold">{npkData.nitrogen}%</span>
                  </div>
                  <Progress value={npkData.nitrogen} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {t('npk.status')}: <span className={`font-semibold ${getNutrientColor(npkData.nitrogen).replace('bg-', 'text-')}`}>
                      {getNutrientStatus(npkData.nitrogen)}
                    </span>
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium">
                      <Beaker className="h-4 w-4 text-warning" />
                      {t('npk.phosphorus')}
                    </span>
                    <span className="text-sm font-bold">{npkData.phosphorus}%</span>
                  </div>
                  <Progress value={npkData.phosphorus} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {t('npk.status')}: <span className={`font-semibold ${getNutrientColor(npkData.phosphorus).replace('bg-', 'text-')}`}>
                      {getNutrientStatus(npkData.phosphorus)}
                    </span>
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium">
                      <Sprout className="h-4 w-4 text-primary" />
                      {t('npk.potassium')}
                    </span>
                    <span className="text-sm font-bold">{npkData.potassium}%</span>
                  </div>
                  <Progress value={npkData.potassium} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {t('npk.status')}: <span className={`font-semibold ${getNutrientColor(npkData.potassium).replace('bg-', 'text-')}`}>
                      {getNutrientStatus(npkData.potassium)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold text-lg">{t('npk.enterAmount')}</h3>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    placeholder={t('npk.litersPlaceholder')}
                    value={fertilizerAmount}
                    onChange={(e) => setFertilizerAmount(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button onClick={generateOrganicMix} className="bg-success hover:bg-success/90">
                    {t('npk.generateMix')}
                  </Button>
                </div>
              </div>

              {organicMix && (
                <Card className="bg-accent/10 border-accent">
                  <CardHeader>
                    <CardTitle className="text-primary">{t('npk.recommendation')}</CardTitle>
                    <CardDescription>
                      {t('npk.forLiters', { amount: organicMix.fertilizerAmount })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                        <span className="font-medium">{t('npk.cowDung')}</span>
                        <span className="font-bold text-primary">{organicMix.cowDung.toFixed(2)} {t('npk.kg')}</span>
                      </div>

                      {organicMix.additives.map((additive: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-background rounded-lg">
                          <div>
                            <span className="font-medium">{additive.displayName}</span>
                            <p className="text-xs text-muted-foreground">Boosts: {additive.boost}</p>
                          </div>
                          <span className="font-bold text-primary">{additive.amount} {t('npk.kg')}</span>
                        </div>
                      ))}

                      <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border-2 border-primary">
                        <span className="font-bold">{t('npk.totalOrganic')}</span>
                        <span className="font-bold text-primary text-lg">{organicMix.total} {t('npk.kg')}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <h4 className="font-semibold">{t('npk.instructions')}:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>{t('npk.step1')}</li>
                        <li>{t('npk.step2', { amount: organicMix.fertilizerAmount })}</li>
                        <li>{t('npk.step3')}</li>
                        <li>{t('npk.step4')}</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Wifi className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{t('npk.noData')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
