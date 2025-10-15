import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const References = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">{t('references.title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t('references.subtitle')}</p>
      </div>

      <Card className="border-2">
        <CardContent className="p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {t('references.soilNutrition')}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>"Soils of South India"</strong> by the Indian Council of Agricultural Research (ICAR). Provides a comprehensive analysis of the major soil groups, their formation, and chemical properties.</li>
              <li>Wani, S. P., et al. (2012). <strong>"Soil Fertility Atlas for Southern India."</strong> International Crops Research Institute for the Semi-Arid Tropics (ICRISAT). This atlas maps nutrient deficiencies and status across various districts.</li>
              <li>Tamil Nadu Agricultural University (TNAU) Agritech Portal. <strong>"Nutrient Management"</strong> section. Offers detailed recommendations for different soil types and crops specific to the region.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {t('references.organicAmendments')}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Garg, A., & Gupta, R. (2011). <strong>"Nutrient dynamics during composting of agricultural and cattle wastes."</strong> Journal of Environmental Management. Discusses the nutrient transformations when combining various organic materials.</li>
              <li>Reddy, D. D. (2013). <strong>"Integrated Nutrient Management for Sustainable Crop Production."</strong> Indian Institute of Soil Science (IISS). Details the benefits of combining organic manures like FYM with mineral fertilizers.</li>
              <li>Eghball, B., & Power, J. F. (1999). <strong>"Phosphorus and nitrogen-based manure and compost applications: Corn production and soil phosphorus."</strong> Soil Science Society of America Journal. Covers the P and N availability from composted cattle manure and bone meal.</li>
              <li>Mahimairaja, S., & Bolan, N. S. (2004). <strong>"Nutrient Value of Wood Ash and its Effects on Soil Properties and Plant Growth."</strong> A review published in the Journal of Plant Nutrition, detailing the high potassium content in wood ash.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
