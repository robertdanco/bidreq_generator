// IAB Content Taxonomy 1.0
// Reference: https://github.com/InteractiveAdvertisingBureau/Taxonomies/blob/main/Content%20Taxonomies/Content%20Taxonomy%201.0.tsv

export interface IabCategory {
  code: string;
  name: string;
  tier: 1 | 2;
  parent?: string;
  parentName?: string;
}

export interface IabCategoryDisplay {
  value: string;
  searchText: string;
  displayText: string;
}

export const IAB_CATEGORIES: readonly IabCategory[] = [
  // IAB1 - Arts & Entertainment
  { code: 'IAB1', name: 'Arts & Entertainment', tier: 1 },
  { code: 'IAB1-1', name: 'Books & Literature', tier: 2, parent: 'IAB1', parentName: 'Arts & Entertainment' },
  { code: 'IAB1-2', name: 'Celebrity Fan/Gossip', tier: 2, parent: 'IAB1', parentName: 'Arts & Entertainment' },
  { code: 'IAB1-3', name: 'Fine Art', tier: 2, parent: 'IAB1', parentName: 'Arts & Entertainment' },
  { code: 'IAB1-4', name: 'Humor', tier: 2, parent: 'IAB1', parentName: 'Arts & Entertainment' },
  { code: 'IAB1-5', name: 'Movies', tier: 2, parent: 'IAB1', parentName: 'Arts & Entertainment' },
  { code: 'IAB1-6', name: 'Music', tier: 2, parent: 'IAB1', parentName: 'Arts & Entertainment' },
  { code: 'IAB1-7', name: 'Television', tier: 2, parent: 'IAB1', parentName: 'Arts & Entertainment' },

  // IAB2 - Automotive
  { code: 'IAB2', name: 'Automotive', tier: 1 },
  { code: 'IAB2-1', name: 'Auto Parts', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-2', name: 'Auto Repair', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-3', name: 'Buying/Selling Cars', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-4', name: 'Car Culture', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-5', name: 'Certified Pre-Owned', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-6', name: 'Convertible', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-7', name: 'Coupe', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-8', name: 'Crossover', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-9', name: 'Diesel', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-10', name: 'Electric Vehicle', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-11', name: 'Hatchback', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-12', name: 'Hybrid', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-13', name: 'Luxury', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-14', name: 'MiniVan', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-15', name: 'Motorcycles', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-16', name: 'Off-Road Vehicles', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-17', name: 'Performance Vehicles', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-18', name: 'Pickup', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-19', name: 'Road-Side Assistance', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-20', name: 'Sedan', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-21', name: 'Trucks & Accessories', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-22', name: 'Vintage Cars', tier: 2, parent: 'IAB2', parentName: 'Automotive' },
  { code: 'IAB2-23', name: 'Wagon', tier: 2, parent: 'IAB2', parentName: 'Automotive' },

  // IAB3 - Business
  { code: 'IAB3', name: 'Business', tier: 1 },
  { code: 'IAB3-1', name: 'Advertising', tier: 2, parent: 'IAB3', parentName: 'Business' },
  { code: 'IAB3-2', name: 'Agriculture', tier: 2, parent: 'IAB3', parentName: 'Business' },
  { code: 'IAB3-3', name: 'Biotech/Biomedical', tier: 2, parent: 'IAB3', parentName: 'Business' },
  { code: 'IAB3-4', name: 'Business Software', tier: 2, parent: 'IAB3', parentName: 'Business' },
  { code: 'IAB3-5', name: 'Construction', tier: 2, parent: 'IAB3', parentName: 'Business' },
  { code: 'IAB3-6', name: 'Forestry', tier: 2, parent: 'IAB3', parentName: 'Business' },
  { code: 'IAB3-7', name: 'Government', tier: 2, parent: 'IAB3', parentName: 'Business' },
  { code: 'IAB3-8', name: 'Green Solutions', tier: 2, parent: 'IAB3', parentName: 'Business' },
  { code: 'IAB3-9', name: 'Human Resources', tier: 2, parent: 'IAB3', parentName: 'Business' },
  { code: 'IAB3-10', name: 'Logistics', tier: 2, parent: 'IAB3', parentName: 'Business' },
  { code: 'IAB3-11', name: 'Marketing', tier: 2, parent: 'IAB3', parentName: 'Business' },
  { code: 'IAB3-12', name: 'Metals', tier: 2, parent: 'IAB3', parentName: 'Business' },

  // IAB4 - Careers
  { code: 'IAB4', name: 'Careers', tier: 1 },
  { code: 'IAB4-1', name: 'Career Planning', tier: 2, parent: 'IAB4', parentName: 'Careers' },
  { code: 'IAB4-2', name: 'College', tier: 2, parent: 'IAB4', parentName: 'Careers' },
  { code: 'IAB4-3', name: 'Financial Aid', tier: 2, parent: 'IAB4', parentName: 'Careers' },
  { code: 'IAB4-4', name: 'Job Fairs', tier: 2, parent: 'IAB4', parentName: 'Careers' },
  { code: 'IAB4-5', name: 'Job Search', tier: 2, parent: 'IAB4', parentName: 'Careers' },
  { code: 'IAB4-6', name: 'Resume Writing/Advice', tier: 2, parent: 'IAB4', parentName: 'Careers' },
  { code: 'IAB4-7', name: 'Nursing', tier: 2, parent: 'IAB4', parentName: 'Careers' },
  { code: 'IAB4-8', name: 'Scholarships', tier: 2, parent: 'IAB4', parentName: 'Careers' },
  { code: 'IAB4-9', name: 'Telecommuting', tier: 2, parent: 'IAB4', parentName: 'Careers' },
  { code: 'IAB4-10', name: 'U.S. Military', tier: 2, parent: 'IAB4', parentName: 'Careers' },
  { code: 'IAB4-11', name: 'Career Advice', tier: 2, parent: 'IAB4', parentName: 'Careers' },

  // IAB5 - Education
  { code: 'IAB5', name: 'Education', tier: 1 },
  { code: 'IAB5-1', name: 'Adult Education', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-2', name: 'Art History', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-3', name: 'College Administration', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-4', name: 'College Life', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-5', name: 'Distance Learning', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-6', name: 'English as 2nd Language', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-7', name: 'Language Learning', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-8', name: 'Graduate School', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-9', name: 'Homeschooling', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-10', name: 'Homework/Study Tips', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-11', name: 'K-6 Educators', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-12', name: 'Private School', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-13', name: 'Special Education', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-14', name: 'Studying Business', tier: 2, parent: 'IAB5', parentName: 'Education' },
  { code: 'IAB5-15', name: 'K-12', tier: 2, parent: 'IAB5', parentName: 'Education' },

  // IAB6 - Family & Parenting
  { code: 'IAB6', name: 'Family & Parenting', tier: 1 },
  { code: 'IAB6-1', name: 'Adoption', tier: 2, parent: 'IAB6', parentName: 'Family & Parenting' },
  { code: 'IAB6-2', name: 'Babies & Toddlers', tier: 2, parent: 'IAB6', parentName: 'Family & Parenting' },
  { code: 'IAB6-3', name: 'Daycare/Pre School', tier: 2, parent: 'IAB6', parentName: 'Family & Parenting' },
  { code: 'IAB6-4', name: 'Family Internet', tier: 2, parent: 'IAB6', parentName: 'Family & Parenting' },
  { code: 'IAB6-5', name: 'Parenting K-6 Kids', tier: 2, parent: 'IAB6', parentName: 'Family & Parenting' },
  { code: 'IAB6-6', name: 'Parenting Teens', tier: 2, parent: 'IAB6', parentName: 'Family & Parenting' },
  { code: 'IAB6-7', name: 'Pregnancy', tier: 2, parent: 'IAB6', parentName: 'Family & Parenting' },
  { code: 'IAB6-8', name: 'Special Needs Kids', tier: 2, parent: 'IAB6', parentName: 'Family & Parenting' },
  { code: 'IAB6-9', name: 'Eldercare', tier: 2, parent: 'IAB6', parentName: 'Family & Parenting' },

  // IAB7 - Health & Fitness
  { code: 'IAB7', name: 'Health & Fitness', tier: 1 },
  { code: 'IAB7-1', name: 'Exercise', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-2', name: 'ADD', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-3', name: 'AIDS/HIV', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-4', name: 'Allergies', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-5', name: 'Alternative Medicine', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-6', name: 'Arthritis', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-7', name: 'Asthma', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-8', name: 'Autism/PDD', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-9', name: 'Bipolar Disorder', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-10', name: 'Brain Tumor', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-11', name: 'Cancer', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-12', name: 'Cholesterol', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-13', name: 'Chronic Fatigue Syndrome', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-14', name: 'Chronic Pain', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-15', name: 'Cold & Flu', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-16', name: 'Deafness', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-17', name: 'Dental Care', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-18', name: 'Depression', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-19', name: 'Dermatology', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-20', name: 'Diabetes', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-21', name: 'Epilepsy', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-22', name: 'GERD/Acid Reflux', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-23', name: 'Headaches/Migraines', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-24', name: 'Heart Disease', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-25', name: 'Herbs for Health', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-26', name: 'Holistic Healing', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-27', name: 'IBS/Crohn\'s Disease', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-28', name: 'Incest/Abuse Support', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-29', name: 'Incontinence', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-30', name: 'Infertility', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-31', name: 'Men\'s Health', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-32', name: 'Nutrition', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-33', name: 'Orthopedics', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-34', name: 'Panic/Anxiety Disorders', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-35', name: 'Pediatrics', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-36', name: 'Physical Therapy', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-37', name: 'Psychology/Psychiatry', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-38', name: 'Senior Health', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-39', name: 'Sexuality', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-40', name: 'Sleep Disorders', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-41', name: 'Smoking Cessation', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-42', name: 'Substance Abuse', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-43', name: 'Thyroid Disease', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-44', name: 'Weight Loss', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },
  { code: 'IAB7-45', name: 'Women\'s Health', tier: 2, parent: 'IAB7', parentName: 'Health & Fitness' },

  // IAB8 - Food & Drink
  { code: 'IAB8', name: 'Food & Drink', tier: 1 },
  { code: 'IAB8-1', name: 'American Cuisine', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-2', name: 'Barbecues & Grilling', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-3', name: 'Cajun/Creole', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-4', name: 'Chinese Cuisine', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-5', name: 'Cocktails/Beer', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-6', name: 'Coffee/Tea', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-7', name: 'Cuisine-Specific', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-8', name: 'Desserts & Baking', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-9', name: 'Dining Out', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-10', name: 'Food Allergies', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-11', name: 'French Cuisine', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-12', name: 'Health/Lowfat Cooking', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-13', name: 'Italian Cuisine', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-14', name: 'Japanese Cuisine', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-15', name: 'Mexican Cuisine', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-16', name: 'Vegan', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-17', name: 'Vegetarian', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },
  { code: 'IAB8-18', name: 'Wine', tier: 2, parent: 'IAB8', parentName: 'Food & Drink' },

  // IAB9 - Hobbies & Interests
  { code: 'IAB9', name: 'Hobbies & Interests', tier: 1 },
  { code: 'IAB9-1', name: 'Art/Technology', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-2', name: 'Arts & Crafts', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-3', name: 'Beadwork', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-4', name: 'Birdwatching', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-5', name: 'Board Games/Puzzles', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-6', name: 'Candle & Soap Making', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-7', name: 'Card Games', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-8', name: 'Chess', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-9', name: 'Cigars', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-10', name: 'Collecting', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-11', name: 'Comic Books', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-12', name: 'Drawing/Sketching', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-13', name: 'Freelance Writing', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-14', name: 'Genealogy', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-15', name: 'Getting Published', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-16', name: 'Guitar', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-17', name: 'Home Recording', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-18', name: 'Investors & Patents', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-19', name: 'Jewelry Making', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-20', name: 'Magic & Illusion', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-21', name: 'Needlework', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-22', name: 'Painting', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-23', name: 'Photography', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-24', name: 'Radio', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-25', name: 'Roleplaying Games', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-26', name: 'Sci-Fi & Fantasy', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-27', name: 'Scrapbooking', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-28', name: 'Screenwriting', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-29', name: 'Stamps & Coins', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-30', name: 'Video & Computer Games', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },
  { code: 'IAB9-31', name: 'Woodworking', tier: 2, parent: 'IAB9', parentName: 'Hobbies & Interests' },

  // IAB10 - Home & Garden
  { code: 'IAB10', name: 'Home & Garden', tier: 1 },
  { code: 'IAB10-1', name: 'Appliances', tier: 2, parent: 'IAB10', parentName: 'Home & Garden' },
  { code: 'IAB10-2', name: 'Entertaining', tier: 2, parent: 'IAB10', parentName: 'Home & Garden' },
  { code: 'IAB10-3', name: 'Environmental Safety', tier: 2, parent: 'IAB10', parentName: 'Home & Garden' },
  { code: 'IAB10-4', name: 'Gardening', tier: 2, parent: 'IAB10', parentName: 'Home & Garden' },
  { code: 'IAB10-5', name: 'Home Repair', tier: 2, parent: 'IAB10', parentName: 'Home & Garden' },
  { code: 'IAB10-6', name: 'Home Theater', tier: 2, parent: 'IAB10', parentName: 'Home & Garden' },
  { code: 'IAB10-7', name: 'Interior Decorating', tier: 2, parent: 'IAB10', parentName: 'Home & Garden' },
  { code: 'IAB10-8', name: 'Landscaping', tier: 2, parent: 'IAB10', parentName: 'Home & Garden' },
  { code: 'IAB10-9', name: 'Remodeling & Construction', tier: 2, parent: 'IAB10', parentName: 'Home & Garden' },

  // IAB11 - Law, Gov't & Politics
  { code: 'IAB11', name: 'Law, Gov\'t & Politics', tier: 1 },
  { code: 'IAB11-1', name: 'Immigration', tier: 2, parent: 'IAB11', parentName: 'Law, Gov\'t & Politics' },
  { code: 'IAB11-2', name: 'Legal Issues', tier: 2, parent: 'IAB11', parentName: 'Law, Gov\'t & Politics' },
  { code: 'IAB11-3', name: 'U.S. Government Resources', tier: 2, parent: 'IAB11', parentName: 'Law, Gov\'t & Politics' },
  { code: 'IAB11-4', name: 'Politics', tier: 2, parent: 'IAB11', parentName: 'Law, Gov\'t & Politics' },
  { code: 'IAB11-5', name: 'Commentary', tier: 2, parent: 'IAB11', parentName: 'Law, Gov\'t & Politics' },

  // IAB12 - News
  { code: 'IAB12', name: 'News', tier: 1 },
  { code: 'IAB12-1', name: 'International News', tier: 2, parent: 'IAB12', parentName: 'News' },
  { code: 'IAB12-2', name: 'National News', tier: 2, parent: 'IAB12', parentName: 'News' },
  { code: 'IAB12-3', name: 'Local News', tier: 2, parent: 'IAB12', parentName: 'News' },

  // IAB13 - Personal Finance
  { code: 'IAB13', name: 'Personal Finance', tier: 1 },
  { code: 'IAB13-1', name: 'Beginning Investing', tier: 2, parent: 'IAB13', parentName: 'Personal Finance' },
  { code: 'IAB13-2', name: 'Credit/Debt & Loans', tier: 2, parent: 'IAB13', parentName: 'Personal Finance' },
  { code: 'IAB13-3', name: 'Financial News', tier: 2, parent: 'IAB13', parentName: 'Personal Finance' },
  { code: 'IAB13-4', name: 'Financial Planning', tier: 2, parent: 'IAB13', parentName: 'Personal Finance' },
  { code: 'IAB13-5', name: 'Hedge Fund', tier: 2, parent: 'IAB13', parentName: 'Personal Finance' },
  { code: 'IAB13-6', name: 'Insurance', tier: 2, parent: 'IAB13', parentName: 'Personal Finance' },
  { code: 'IAB13-7', name: 'Investing', tier: 2, parent: 'IAB13', parentName: 'Personal Finance' },
  { code: 'IAB13-8', name: 'Mutual Funds', tier: 2, parent: 'IAB13', parentName: 'Personal Finance' },
  { code: 'IAB13-9', name: 'Options', tier: 2, parent: 'IAB13', parentName: 'Personal Finance' },
  { code: 'IAB13-10', name: 'Retirement Planning', tier: 2, parent: 'IAB13', parentName: 'Personal Finance' },
  { code: 'IAB13-11', name: 'Stocks', tier: 2, parent: 'IAB13', parentName: 'Personal Finance' },
  { code: 'IAB13-12', name: 'Tax Planning', tier: 2, parent: 'IAB13', parentName: 'Personal Finance' },

  // IAB14 - Society
  { code: 'IAB14', name: 'Society', tier: 1 },
  { code: 'IAB14-1', name: 'Dating', tier: 2, parent: 'IAB14', parentName: 'Society' },
  { code: 'IAB14-2', name: 'Divorce Support', tier: 2, parent: 'IAB14', parentName: 'Society' },
  { code: 'IAB14-3', name: 'Gay Life', tier: 2, parent: 'IAB14', parentName: 'Society' },
  { code: 'IAB14-4', name: 'Marriage', tier: 2, parent: 'IAB14', parentName: 'Society' },
  { code: 'IAB14-5', name: 'Senior Living', tier: 2, parent: 'IAB14', parentName: 'Society' },
  { code: 'IAB14-6', name: 'Teens', tier: 2, parent: 'IAB14', parentName: 'Society' },
  { code: 'IAB14-7', name: 'Weddings', tier: 2, parent: 'IAB14', parentName: 'Society' },
  { code: 'IAB14-8', name: 'Ethnic Specific', tier: 2, parent: 'IAB14', parentName: 'Society' },

  // IAB15 - Science
  { code: 'IAB15', name: 'Science', tier: 1 },
  { code: 'IAB15-1', name: 'Astrology', tier: 2, parent: 'IAB15', parentName: 'Science' },
  { code: 'IAB15-2', name: 'Biology', tier: 2, parent: 'IAB15', parentName: 'Science' },
  { code: 'IAB15-3', name: 'Chemistry', tier: 2, parent: 'IAB15', parentName: 'Science' },
  { code: 'IAB15-4', name: 'Geology', tier: 2, parent: 'IAB15', parentName: 'Science' },
  { code: 'IAB15-5', name: 'Paranormal Phenomena', tier: 2, parent: 'IAB15', parentName: 'Science' },
  { code: 'IAB15-6', name: 'Physics', tier: 2, parent: 'IAB15', parentName: 'Science' },
  { code: 'IAB15-7', name: 'Space/Astronomy', tier: 2, parent: 'IAB15', parentName: 'Science' },
  { code: 'IAB15-8', name: 'Geography', tier: 2, parent: 'IAB15', parentName: 'Science' },
  { code: 'IAB15-9', name: 'Botany', tier: 2, parent: 'IAB15', parentName: 'Science' },
  { code: 'IAB15-10', name: 'Weather', tier: 2, parent: 'IAB15', parentName: 'Science' },

  // IAB16 - Pets
  { code: 'IAB16', name: 'Pets', tier: 1 },
  { code: 'IAB16-1', name: 'Aquariums', tier: 2, parent: 'IAB16', parentName: 'Pets' },
  { code: 'IAB16-2', name: 'Birds', tier: 2, parent: 'IAB16', parentName: 'Pets' },
  { code: 'IAB16-3', name: 'Cats', tier: 2, parent: 'IAB16', parentName: 'Pets' },
  { code: 'IAB16-4', name: 'Dogs', tier: 2, parent: 'IAB16', parentName: 'Pets' },
  { code: 'IAB16-5', name: 'Large Animals', tier: 2, parent: 'IAB16', parentName: 'Pets' },
  { code: 'IAB16-6', name: 'Reptiles', tier: 2, parent: 'IAB16', parentName: 'Pets' },
  { code: 'IAB16-7', name: 'Veterinary Medicine', tier: 2, parent: 'IAB16', parentName: 'Pets' },

  // IAB17 - Sports
  { code: 'IAB17', name: 'Sports', tier: 1 },
  { code: 'IAB17-1', name: 'Auto Racing', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-2', name: 'Baseball', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-3', name: 'Bicycling', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-4', name: 'Bodybuilding', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-5', name: 'Boxing', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-6', name: 'Canoeing/Kayaking', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-7', name: 'Cheerleading', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-8', name: 'Climbing', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-9', name: 'Cricket', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-10', name: 'Figure Skating', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-11', name: 'Fly Fishing', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-12', name: 'Football', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-13', name: 'Freshwater Fishing', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-14', name: 'Game & Fish', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-15', name: 'Golf', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-16', name: 'Horse Racing', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-17', name: 'Horses', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-18', name: 'Hunting/Shooting', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-19', name: 'Inline Skating', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-20', name: 'Martial Arts', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-21', name: 'Mountain Biking', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-22', name: 'NASCAR Racing', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-23', name: 'Olympics', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-24', name: 'Paintball', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-25', name: 'Power & Motorcycles', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-26', name: 'Pro Basketball', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-27', name: 'Pro Ice Hockey', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-28', name: 'Rodeo', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-29', name: 'Rugby', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-30', name: 'Running/Jogging', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-31', name: 'Sailing', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-32', name: 'Saltwater Fishing', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-33', name: 'Scuba Diving', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-34', name: 'Skateboarding', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-35', name: 'Skiing', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-36', name: 'Snowboarding', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-37', name: 'Surfing/Bodyboarding', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-38', name: 'Swimming', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-39', name: 'Table Tennis/Ping-Pong', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-40', name: 'Tennis', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-41', name: 'Volleyball', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-42', name: 'Walking', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-43', name: 'Waterski/Wakeboard', tier: 2, parent: 'IAB17', parentName: 'Sports' },
  { code: 'IAB17-44', name: 'World Soccer', tier: 2, parent: 'IAB17', parentName: 'Sports' },

  // IAB18 - Style & Fashion
  { code: 'IAB18', name: 'Style & Fashion', tier: 1 },
  { code: 'IAB18-1', name: 'Beauty', tier: 2, parent: 'IAB18', parentName: 'Style & Fashion' },
  { code: 'IAB18-2', name: 'Body Art', tier: 2, parent: 'IAB18', parentName: 'Style & Fashion' },
  { code: 'IAB18-3', name: 'Fashion', tier: 2, parent: 'IAB18', parentName: 'Style & Fashion' },
  { code: 'IAB18-4', name: 'Jewelry', tier: 2, parent: 'IAB18', parentName: 'Style & Fashion' },
  { code: 'IAB18-5', name: 'Clothing', tier: 2, parent: 'IAB18', parentName: 'Style & Fashion' },
  { code: 'IAB18-6', name: 'Accessories', tier: 2, parent: 'IAB18', parentName: 'Style & Fashion' },

  // IAB19 - Technology & Computing
  { code: 'IAB19', name: 'Technology & Computing', tier: 1 },
  { code: 'IAB19-1', name: '3-D Graphics', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-2', name: 'Animation', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-3', name: 'Antivirus Software', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-4', name: 'C/C++', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-5', name: 'Cameras & Camcorders', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-6', name: 'Cell Phones', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-7', name: 'Computer Certification', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-8', name: 'Computer Networking', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-9', name: 'Computer Peripherals', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-10', name: 'Computer Reviews', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-11', name: 'Data Centers', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-12', name: 'Databases', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-13', name: 'Desktop Publishing', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-14', name: 'Desktop Video', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-15', name: 'Email', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-16', name: 'Graphics Software', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-17', name: 'Home Video/DVD', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-18', name: 'Internet Technology', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-19', name: 'Java', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-20', name: 'JavaScript', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-21', name: 'Mac Support', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-22', name: 'MP3/MIDI', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-23', name: 'Net Conferencing', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-24', name: 'Net for Beginners', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-25', name: 'Network Security', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-26', name: 'Palmtops/PDAs', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-27', name: 'PC Support', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-28', name: 'Portable Entertainment', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-29', name: 'Shareware/Freeware', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-30', name: 'Unix', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-31', name: 'Visual Basic', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-32', name: 'Web Clip Art', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-33', name: 'Web Design/HTML', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-34', name: 'Web Search', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-35', name: 'Windows', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },
  { code: 'IAB19-36', name: 'Tablets', tier: 2, parent: 'IAB19', parentName: 'Technology & Computing' },

  // IAB20 - Travel
  { code: 'IAB20', name: 'Travel', tier: 1 },
  { code: 'IAB20-1', name: 'Adventure Travel', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-2', name: 'Africa', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-3', name: 'Air Travel', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-4', name: 'Australia & New Zealand', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-5', name: 'Bed & Breakfasts', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-6', name: 'Budget Travel', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-7', name: 'Business Travel', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-8', name: 'By US Locale', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-9', name: 'Camping', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-10', name: 'Canada', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-11', name: 'Caribbean', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-12', name: 'Cruises', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-13', name: 'Eastern Europe', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-14', name: 'Europe', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-15', name: 'France', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-16', name: 'Greece', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-17', name: 'Honeymoons/Getaways', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-18', name: 'Hotels', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-19', name: 'Italy', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-20', name: 'Japan', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-21', name: 'Mexico & Central America', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-22', name: 'National Parks', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-23', name: 'South America', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-24', name: 'Spas', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-25', name: 'Theme Parks', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-26', name: 'Traveling with Kids', tier: 2, parent: 'IAB20', parentName: 'Travel' },
  { code: 'IAB20-27', name: 'United Kingdom', tier: 2, parent: 'IAB20', parentName: 'Travel' },

  // IAB21 - Real Estate
  { code: 'IAB21', name: 'Real Estate', tier: 1 },
  { code: 'IAB21-1', name: 'Apartments', tier: 2, parent: 'IAB21', parentName: 'Real Estate' },
  { code: 'IAB21-2', name: 'Architects', tier: 2, parent: 'IAB21', parentName: 'Real Estate' },
  { code: 'IAB21-3', name: 'Buying/Selling Homes', tier: 2, parent: 'IAB21', parentName: 'Real Estate' },

  // IAB22 - Shopping
  { code: 'IAB22', name: 'Shopping', tier: 1 },
  { code: 'IAB22-1', name: 'Contests & Freebies', tier: 2, parent: 'IAB22', parentName: 'Shopping' },
  { code: 'IAB22-2', name: 'Couponing', tier: 2, parent: 'IAB22', parentName: 'Shopping' },
  { code: 'IAB22-3', name: 'Comparison Shopping', tier: 2, parent: 'IAB22', parentName: 'Shopping' },
  { code: 'IAB22-4', name: 'Engines', tier: 2, parent: 'IAB22', parentName: 'Shopping' },

  // IAB23 - Religion & Spirituality
  { code: 'IAB23', name: 'Religion & Spirituality', tier: 1 },
  { code: 'IAB23-1', name: 'Alternative Religions', tier: 2, parent: 'IAB23', parentName: 'Religion & Spirituality' },
  { code: 'IAB23-2', name: 'Atheism/Agnosticism', tier: 2, parent: 'IAB23', parentName: 'Religion & Spirituality' },
  { code: 'IAB23-3', name: 'Buddhism', tier: 2, parent: 'IAB23', parentName: 'Religion & Spirituality' },
  { code: 'IAB23-4', name: 'Catholicism', tier: 2, parent: 'IAB23', parentName: 'Religion & Spirituality' },
  { code: 'IAB23-5', name: 'Christianity', tier: 2, parent: 'IAB23', parentName: 'Religion & Spirituality' },
  { code: 'IAB23-6', name: 'Hinduism', tier: 2, parent: 'IAB23', parentName: 'Religion & Spirituality' },
  { code: 'IAB23-7', name: 'Islam', tier: 2, parent: 'IAB23', parentName: 'Religion & Spirituality' },
  { code: 'IAB23-8', name: 'Judaism', tier: 2, parent: 'IAB23', parentName: 'Religion & Spirituality' },
  { code: 'IAB23-9', name: 'Latter-Day Saints', tier: 2, parent: 'IAB23', parentName: 'Religion & Spirituality' },
  { code: 'IAB23-10', name: 'Pagan/Wiccan', tier: 2, parent: 'IAB23', parentName: 'Religion & Spirituality' },

  // IAB24 - Uncategorized
  { code: 'IAB24', name: 'Uncategorized', tier: 1 },

  // IAB25 - Non-Standard Content
  { code: 'IAB25', name: 'Non-Standard Content', tier: 1 },
  { code: 'IAB25-1', name: 'Unmoderated UGC', tier: 2, parent: 'IAB25', parentName: 'Non-Standard Content' },
  { code: 'IAB25-2', name: 'Extreme Graphic/Explicit Violence', tier: 2, parent: 'IAB25', parentName: 'Non-Standard Content' },
  { code: 'IAB25-3', name: 'Pornography', tier: 2, parent: 'IAB25', parentName: 'Non-Standard Content' },
  { code: 'IAB25-4', name: 'Profane Content', tier: 2, parent: 'IAB25', parentName: 'Non-Standard Content' },
  { code: 'IAB25-5', name: 'Hate Content', tier: 2, parent: 'IAB25', parentName: 'Non-Standard Content' },
  { code: 'IAB25-6', name: 'Under Construction', tier: 2, parent: 'IAB25', parentName: 'Non-Standard Content' },
  { code: 'IAB25-7', name: 'Incentivized', tier: 2, parent: 'IAB25', parentName: 'Non-Standard Content' },

  // IAB26 - Illegal Content
  { code: 'IAB26', name: 'Illegal Content', tier: 1 },
  { code: 'IAB26-1', name: 'Illegal Content', tier: 2, parent: 'IAB26', parentName: 'Illegal Content' },
  { code: 'IAB26-2', name: 'Warez', tier: 2, parent: 'IAB26', parentName: 'Illegal Content' },
  { code: 'IAB26-3', name: 'Spyware/Malware', tier: 2, parent: 'IAB26', parentName: 'Illegal Content' },
  { code: 'IAB26-4', name: 'Copyright Infringement', tier: 2, parent: 'IAB26', parentName: 'Illegal Content' },
] as const;

// Tier 1 categories only
export const IAB_TIER1_CATEGORIES: readonly IabCategory[] = IAB_CATEGORIES.filter(
  (cat) => cat.tier === 1
);

/**
 * Get display string for a category code.
 * @param code - IAB category code (e.g., 'IAB1-1' or 'IAB1')
 * @returns Formatted display string (e.g., 'Arts & Entertainment > Books & Literature')
 */
export function getIabCategoryDisplay(code: string): string {
  const category = IAB_CATEGORIES.find((cat) => cat.code === code);
  if (!category) {
    return code;
  }

  if (category.tier === 1) {
    return category.name;
  }

  // Tier 2: show parent > child
  return `${category.parentName} > ${category.name}`;
}

/**
 * Get all categories formatted for searchable dropdown.
 * @returns Array of categories with pre-computed search text for efficient filtering
 */
export function getIabCategorySuggestions(): IabCategoryDisplay[] {
  return IAB_CATEGORIES.map((cat) => {
    const displayText = getIabCategoryDisplay(cat.code);

    // Pre-compute lowercase search text for efficient filtering
    const searchParts = [cat.code, cat.name];
    if (cat.parentName) {
      searchParts.push(cat.parentName);
    }
    const searchText = searchParts.join(' ').toLowerCase();

    return {
      value: cat.code,
      displayText,
      searchText,
    };
  }).sort((a, b) => a.value.localeCompare(b.value));
}
