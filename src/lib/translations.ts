export type Language = 'en' | 'ur';

export const translations = {
  // App title
  appName: {
    en: 'Rozgaar GB',
    ur: 'روزگار جی بی'
  },
  appTagline: {
    en: 'Find Local Workers',
    ur: 'مقامی کاریگر تلاش کریں'
  },
  
  // Navigation
  home: { en: 'Home', ur: 'ہوم' },
  workers: { en: 'Workers', ur: 'کاریگر' },
  login: { en: 'Login', ur: 'لاگ ان' },
  register: { en: 'Register', ur: 'رجسٹر' },
  logout: { en: 'Logout', ur: 'لاگ آؤٹ' },
  myProfile: { en: 'My Profile', ur: 'میری پروفائل' },
  
  // Categories
  categories: { en: 'Categories', ur: 'زمرے' },
  allCategories: { en: 'All Categories', ur: 'تمام زمرے' },
  plumber: { en: 'Plumber', ur: 'پلمبر' },
  electrician: { en: 'Electrician', ur: 'الیکٹریشن' },
  painter: { en: 'Painter', ur: 'پینٹر' },
  carpenter: { en: 'Carpenter', ur: 'بڑھئی' },
  mason: { en: 'Mason', ur: 'راج مستری' },
  laborer: { en: 'Laborer', ur: 'مزدور' },
  maid: { en: 'Maid', ur: 'گھریلو ملازمہ' },
  cook: { en: 'Cook', ur: 'باورچی' },
  driver: { en: 'Driver', ur: 'ڈرائیور' },
  gardener: { en: 'Gardener', ur: 'مالی' },
  security_guard: { en: 'Security Guard', ur: 'چوکیدار' },
  other: { en: 'Other', ur: 'دیگر' },
  
  // Locations
  selectLocation: { en: 'Select Location', ur: 'مقام منتخب کریں' },
  allLocations: { en: 'All Locations', ur: 'تمام مقامات' },
  gilgit: { en: 'Gilgit', ur: 'گلگت' },
  skardu: { en: 'Skardu', ur: 'سکردو' },
  hunza: { en: 'Hunza', ur: 'ہنزہ' },
  nagar: { en: 'Nagar', ur: 'نگر' },
  ghizer: { en: 'Ghizer', ur: 'غذر' },
  diamer: { en: 'Diamer', ur: 'دیامر' },
  astore: { en: 'Astore', ur: 'استور' },
  ghanche: { en: 'Ghanche', ur: 'گھانچے' },
  shigar: { en: 'Shigar', ur: 'شگر' },
  kharmang: { en: 'Kharmang', ur: 'کھرمنگ' },
  
  // Worker profile
  hourlyRate: { en: 'Hourly Rate', ur: 'فی گھنٹہ' },
  dailyRate: { en: 'Daily Rate', ur: 'فی دن' },
  perHour: { en: '/hour', ur: '/گھنٹہ' },
  perDay: { en: '/day', ur: '/دن' },
  rs: { en: 'Rs.', ur: 'روپے' },
  callNow: { en: 'Call Now', ur: 'ابھی کال کریں' },
  whatsapp: { en: 'WhatsApp', ur: 'واٹس ایپ' },
  reviews: { en: 'Reviews', ur: 'جائزے' },
  noReviews: { en: 'No reviews yet', ur: 'ابھی کوئی جائزہ نہیں' },
  writeReview: { en: 'Write a Review', ur: 'جائزہ لکھیں' },
  available: { en: 'Available', ur: 'دستیاب' },
  notAvailable: { en: 'Not Available', ur: 'دستیاب نہیں' },
  
  // Forms
  fullName: { en: 'Full Name', ur: 'پورا نام' },
  phone: { en: 'Phone Number', ur: 'فون نمبر' },
  whatsappNumber: { en: 'WhatsApp Number', ur: 'واٹس ایپ نمبر' },
  email: { en: 'Email', ur: 'ای میل' },
  password: { en: 'Password', ur: 'پاس ورڈ' },
  confirmPassword: { en: 'Confirm Password', ur: 'پاس ورڈ دوبارہ لکھیں' },
  category: { en: 'Service Category', ur: 'سروس زمرہ' },
  location: { en: 'Your Location', ur: 'آپ کا مقام' },
  areasServed: { en: 'Areas You Serve', ur: 'جن علاقوں میں آپ کام کرتے ہیں' },
  description: { en: 'About Your Work', ur: 'اپنے کام کے بارے میں' },
  profilePhoto: { en: 'Profile Photo', ur: 'پروفائل فوٹو' },
  uploadPhoto: { en: 'Upload Photo', ur: 'فوٹو اپلوڈ کریں' },
  save: { en: 'Save', ur: 'محفوظ کریں' },
  submit: { en: 'Submit', ur: 'بھیجیں' },
  cancel: { en: 'Cancel', ur: 'منسوخ' },
  
  // Review form
  yourName: { en: 'Your Name', ur: 'آپ کا نام' },
  yourPhone: { en: 'Your Phone (Optional)', ur: 'آپ کا فون (اختیاری)' },
  rating: { en: 'Rating', ur: 'درجہ بندی' },
  yourReview: { en: 'Your Review', ur: 'آپ کا جائزہ' },
  reviewPlaceholder: { en: 'How was your experience?', ur: 'آپ کا تجربہ کیسا رہا؟' },
  submitReview: { en: 'Submit Review', ur: 'جائزہ بھیجیں' },
  reviewSuccess: { en: 'Review submitted successfully!', ur: 'جائزہ کامیابی سے بھیج دیا گیا!' },
  
  // Auth
  loginTitle: { en: 'Worker Login', ur: 'کاریگر لاگ ان' },
  registerTitle: { en: 'Worker Registration', ur: 'کاریگر رجسٹریشن' },
  noAccount: { en: "Don't have an account?", ur: 'اکاؤنٹ نہیں ہے؟' },
  haveAccount: { en: 'Already have an account?', ur: 'پہلے سے اکاؤنٹ ہے؟' },
  signupSuccess: { en: 'Account created! Please complete your profile.', ur: 'اکاؤنٹ بن گیا! براہ کرم اپنی پروفائل مکمل کریں۔' },
  loginSuccess: { en: 'Login successful!', ur: 'لاگ ان کامیاب!' },
  loginError: { en: 'Login failed. Check your email and password.', ur: 'لاگ ان ناکام۔ ای میل اور پاس ورڈ چیک کریں۔' },
  
  // Messages
  noWorkersFound: { en: 'No workers found', ur: 'کوئی کاریگر نہیں ملا' },
  tryDifferentFilters: { en: 'Try different filters', ur: 'مختلف فلٹرز آزمائیں' },
  loading: { en: 'Loading...', ur: 'لوڈ ہو رہا ہے...' },
  error: { en: 'Something went wrong', ur: 'کچھ غلط ہو گیا' },
  searchPlaceholder: { en: 'Search workers...', ur: 'کاریگر تلاش کریں...' },
  
  // Profile page
  editProfile: { en: 'Edit Profile', ur: 'پروفائل میں ترمیم' },
  profileUpdated: { en: 'Profile updated successfully!', ur: 'پروفائل کامیابی سے اپڈیٹ ہو گئی!' },
  completeProfile: { en: 'Complete Your Profile', ur: 'اپنی پروفائل مکمل کریں' },
  
  // Footer
  madeWith: { en: 'Made for Gilgit-Baltistan', ur: 'گلگت بلتستان کے لیے بنایا گیا' },
};

export function t(key: keyof typeof translations, lang: Language): string {
  return translations[key]?.[lang] || key;
}
