import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Database } from '@/integrations/supabase/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type LocationArea = Database['public']['Enums']['location_area'];

const locations: LocationArea[] = [
  'gilgit',
  'skardu',
  'hunza',
  'nagar',
  'ghizer',
  'diamer',
  'astore',
  'ghanche',
  'shigar',
  'kharmang',
];

interface LocationFilterProps {
  value: LocationArea | null;
  onChange: (value: LocationArea | null) => void;
}

export function LocationFilter({ value, onChange }: LocationFilterProps) {
  const { language } = useLanguage();

  return (
    <Select
      value={value || 'all'}
      onValueChange={(v) => onChange(v === 'all' ? null : v as LocationArea)}
    >
      <SelectTrigger className="w-full sm:w-[220px] h-14 text-base border-0 focus:ring-2 focus:ring-primary/20">
        <SelectValue placeholder={t('selectLocation', language)} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{t('allLocations', language)}</SelectItem>
        {locations.map((location) => (
          <SelectItem key={location} value={location}>
            {t(location as keyof typeof t, language)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
