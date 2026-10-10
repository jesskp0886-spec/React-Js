const contents = ['Pork', 'Tenderloin', 'Green Pepper'];
const d = (title, price) => ({ title, price, contents });

export const menuSections = [
  {
    title: 'Starters',
    image: '/images/starters.jpg',
    dishes: [
      d('Pork Tenderloin in Green Pepper', '$20'),
      d('Shrimp with Garlic', '$17'),
      d('Wild Mushroom with Chicken', '$20'),
      d('Oysters with Baked Potatoes', '$20'),
      d('Roast Pork', '$17'),
    ],
  },
  {
    title: 'Main',
    image: '/images/main.jpg',
    dishes: [
      d('Chicken with Lemon', '$20'),
      d('Pork Tenderloin in Green Pepper', '$20'),
      d('Shrimp with Garlic', '$17'),
      d('Wild Mushroom with Chicken', '$20'),
      d('Oysters with Baked Potatoes', '$20'),
      d('Roast Pork', '$17'),
    ],
  },
  {
    title: 'Deserts',
    image: '/images/deserts.jpg',
    dishes: [
      d('Lava Cake', '$20'),
      d('Orange Tart', '$17'),
      d('Cheese Cake', '$20'),
      d('Chocolatte Mausse', '$17'),
      d('Ice Cream', '$17'),
    ],
  },
];

export const signatureDishes = [
  { name: 'Pork Tenderloin marinated in Green Pepper', price: '$20', image: '/images/sig_1.jpg', list: ['Pork', 'Tenderloin', 'Green Pepper', 'Veggies'] },
  { name: 'Beef Tartar with forest mushroms', price: '$23', image: '/images/sig_2.jpg', list: ['Pork', 'Tenderloin', 'Green Pepper', 'Veggies'] },
  { name: 'Beef Steak with sauted vegetables', price: '$20', image: '/images/sig_3.jpg', list: ['Pork', 'Tenderloin', 'Green Pepper', 'Veggies'] },
];

export const chefs = [
  { name: 'Maria Smith', role: 'Top Chef', image: '/images/chef_1.jpg' },
  { name: 'William Jones', role: 'Sauce Chef', image: '/images/chef_2.jpg' },
  { name: 'Julien Williams', role: 'Sushi Chef', image: '/images/chef_3.jpg' },
  { name: 'Suzie James', role: 'Sauce Chef', image: '/images/chef_4.jpg' },
];

export const testimonials = [
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lorem maximus mauris scelerisque, at rutrum nulla dictum. Ut ac ligula sapien. Suspendisse cursus faucibus finibus.',
    name: 'James Smith',
    role: 'Client',
  },
  {
    text: 'A wonderful evening from start to finish. The service was warm, the food was beautifully presented and we will definitely be back for the signature dish.',
    name: 'Emma Davis',
    role: 'Client',
  },
  {
    text: 'We held a family celebration here and the team looked after every detail. Highly recommended for any special occasion.',
    name: 'Carlos Rivera',
    role: 'Client',
  },
];
