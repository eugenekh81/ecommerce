import { Rating } from './RatingIS';

export interface ProductIS {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
}
