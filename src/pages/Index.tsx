import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageSelector } from '@/components/LanguageSelector';
import { NPKSensor } from '@/components/NPKSensor';
import { SoilExplorer } from '@/components/SoilExplorer';
import { CropGuide } from '@/components/CropGuide';
import { OrganicSolutions } from '@/components/OrganicSolutions';
import { References } from '@/components/References';
import { Wifi, Sprout, BookText, Leaf, BookOpen } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('npk');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-8 max-w-7xl">
        <header className="text-center mb-8">
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('app.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('app.subtitle')}
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-10 bg-secondary/50 p-2 h-auto">
            <TabsTrigger 
              value="npk" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth py-3"
            >
              <Wifi className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t('nav.npkSensor')}</span>
              <span className="sm:hidden">NPK</span>
            </TabsTrigger>
            <TabsTrigger 
              value="soil"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth py-3"
            >
              <Sprout className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t('nav.soilExplorer')}</span>
              <span className="sm:hidden">Soil</span>
            </TabsTrigger>
            <TabsTrigger 
              value="crop"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth py-3"
            >
              <BookText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t('nav.cropGuide')}</span>
              <span className="sm:hidden">Crop</span>
            </TabsTrigger>
            <TabsTrigger 
              value="organic"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth py-3"
            >
              <Leaf className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t('nav.organicSolutions')}</span>
              <span className="sm:hidden">Organic</span>
            </TabsTrigger>
            <TabsTrigger 
              value="references"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth py-3"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t('nav.references')}</span>
              <span className="sm:hidden">Refs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="npk" className="animate-in fade-in-50 duration-500">
            <NPKSensor />
          </TabsContent>

          <TabsContent value="soil" className="animate-in fade-in-50 duration-500">
            <SoilExplorer />
          </TabsContent>

          <TabsContent value="crop" className="animate-in fade-in-50 duration-500">
            <CropGuide />
          </TabsContent>

          <TabsContent value="organic" className="animate-in fade-in-50 duration-500">
            <OrganicSolutions />
          </TabsContent>

          <TabsContent value="references" className="animate-in fade-in-50 duration-500">
            <References />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
