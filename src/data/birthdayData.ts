export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  category: 'Hermandad' | 'Risas' | 'Aventuras' | 'Elegancia';
  description: string;
  image: string;
  tag: string;
}

export interface GiftItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  message: string;
  iconName: string;
  revealed: boolean;
  color: string;
}

export interface WishNote {
  id: string;
  author: string;
  text: string;
  color: string;
  rotation: string;
  date: string;
}

export interface BalloonItem {
  id: number;
  color: string;
  message: string;
  popped: boolean;
}

export const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'm1',
    title: 'Generación 2021: El Comienzo de la Hermandad',
    date: '2021 - Presente',
    category: 'Hermandad',
    description: 'Desde las primeras anécdotas juntos construyendo una amistad que nada ni nadie puede romper.',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_22.32.32_9bc0f408.jpeg',
    tag: 'Desde 2021'
  },
  {
    id: 'm2',
    title: 'De Gala y con Todo el Porte',
    date: 'Día de Graduación',
    category: 'Elegancia',
    description: 'Traje formal, corbata elegante y la mejor compañía al lado del lago. ¡Un día memorable para todos!',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_22.32.32__3__ce5b1653.jpeg',
    tag: 'Elegancia pura'
  },
  {
    id: 'm3',
    title: 'Risas y Carcajadas Sin Filtro',
    date: 'Tarde Legendaria',
    category: 'Risas',
    description: 'Las mejores fotos siempre son en las que terminamos llorando de la risa de puras tonterías.',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_22.32.32__4__e72a627f.jpeg',
    tag: 'Risas épicas'
  },
  {
    id: 'm4',
    title: 'El Trío Imparable en Acción',
    date: 'Día de Celebración',
    category: 'Hermandad',
    description: 'Complicidad pura. Celebrando cada logro hombro a hombro como los verdaderos hermanos que somos.',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_22.32.32__5__22b1824f.jpeg',
    tag: 'Brothers for life'
  },
  {
    id: 'm5',
    title: 'Unidos en Cada Proyecto y Meta',
    date: 'Recuerdos de Éxito',
    category: 'Aventuras',
    description: 'Momentos compartidos donde soñamos en grande y demostramos que juntos no hay obstáculo que nos detenga.',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_22.32.32__1__e5c94bed.jpeg',
    tag: 'Equipo firme'
  },
  {
    id: 'm6',
    title: 'Hermanos de Vida y de Camino',
    date: 'Inolvidable',
    category: 'Hermandad',
    description: 'Una postal que resume la lealtad, el respeto mutuo y la felicidad de vernos crecer y triunfar.',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_22.32.32__2__692c3dc8.jpeg',
    tag: 'Lealtad 100%'
  },
  {
    id: 'm7',
    title: 'Cómplices de Mil Batallas',
    date: 'Gran Anécdota',
    category: 'Aventuras',
    description: 'De esos días en los que el tiempo voló entre charlas épicas y recuerdos que se quedan para siempre.',
    image: '/assets/aistudio/friend_photo_7.jpeg',
    tag: 'Momentos TOP'
  },
  {
    id: 'm8',
    title: 'Brindis por el Cumpleañero',
    date: 'Hoy y Siempre',
    category: 'Elegancia',
    description: 'Hoy toca festejarte en grande por ser el mejor amigo, un crack y una persona de diez.',
    image: '/assets/aistudio/friend_photo_8.jpeg',
    tag: 'Crack total'
  }
];

export const INITIAL_GIFTS: GiftItem[] = [
  {
    id: 'g1',
    title: 'Vale por una Comida Épica (Asado, Pizza o Burgers)',
    subtitle: 'Comida legendaria donde tú eliges el lugar',
    badge: '100% Pagado por mí',
    message: 'Tú eliges el menú: el mejor asado, las hamburguesas más bestias o la pizza que quieras. Yo pongo la cuenta completa sin excusas.',
    iconName: 'Utensils',
    revealed: false,
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'g2',
    title: 'Pase VIP de Respaldo Bro 24/7',
    subtitle: 'Llamada de emergencia en cualquier momento',
    badge: 'Sin caducidad',
    message: 'Derecho a llamarme a las 3:00 AM para pedir rescate, hablar de la vida, desahogarte o planear la próxima locura. Cuentas conmigo siempre.',
    iconName: 'PhoneCall',
    revealed: false,
    color: 'from-cyan-600 to-teal-500'
  },
  {
    id: 'g3',
    title: 'Maratón Gamer / Noche de Pelis y Botanas',
    subtitle: 'PlayStation, PC o maratón en pantalla gigante',
    badge: 'Snacks y bebidas incluidos',
    message: 'Tú mandas: tus videojuegos favoritos, retas de FIFA/Call of Duty, maratón de películas y comida chatarra sin límite toda la noche.',
    iconName: 'Gamepad2',
    revealed: false,
    color: 'from-indigo-600 to-blue-500'
  },
  {
    id: 'g4',
    title: 'El Comodín de Oro de Amistad',
    subtitle: 'Un deseo o favor que tú decidas',
    badge: 'Voto de Hermandad',
    message: 'Úsalo cuando quieras durante este año: un favor importante, un viaje improvisado o cualquier plan que se te ocurra y yo te cumplo.',
    iconName: 'Sparkles',
    revealed: false,
    color: 'from-amber-500 to-yellow-400'
  }
];

export const INITIAL_BALLOONS: BalloonItem[] = [
  { id: 1, color: 'bg-cyan-500', message: '¡Que este año rompas todas tus metas y proyectos, hermano!', popped: false },
  { id: 2, color: 'bg-blue-600', message: '¡Gracias por ser ese amigo firme que nunca falla ni en las buenas ni en las malas!', popped: false },
  { id: 3, color: 'bg-emerald-500', message: '¡La vida es mil veces más divertida y épica teniéndote como bro!', popped: false },
  { id: 4, color: 'bg-amber-500', message: '¡Mucho éxito, salud y prosperidad para ti hoy y siempre!', popped: false },
  { id: 5, color: 'bg-indigo-500', message: '¡Por 100 años más de anécdotas, viajes y victorias juntos!', popped: false },
  { id: 6, color: 'bg-teal-500', message: '¡Eres un crack indiscutible! Nunca pierdas esa chispa y nobleza.', popped: false },
  { id: 7, color: 'bg-sky-500', message: '¡Este nuevo año de vida será tu mejor temporada sin duda!', popped: false },
  { id: 8, color: 'bg-slate-700', message: '¡Salud por el mejor amigo y cómplice que se puede tener!', popped: false }
];

export const INITIAL_WISHES: WishNote[] = [
  {
    id: 'w1',
    author: 'Tu gran cómplice',
    text: '¡Feliz cumpleaños, hermano! Gracias por todas las risas desde el colegio y por seguir firmes hasta hoy. ¡A festejarlo en grande!',
    color: 'bg-slate-900 text-cyan-300 border-cyan-500/40',
    rotation: '-rotate-1',
    date: 'Hoy'
  },
  {
    id: 'w2',
    author: 'El grupo de amigos',
    text: '¡Felices vueltas al sol al mero jefe! Que sigan los éxitos y los momentos legendarios juntos.',
    color: 'bg-slate-900 text-amber-300 border-amber-500/40',
    rotation: 'rotate-2',
    date: 'Hoy'
  },
  {
    id: 'w3',
    author: 'La pandilla',
    text: 'Un orgullo verte crecer y superarte día con día. ¡Cuentas con nosotros para lo que sea, bro!',
    color: 'bg-slate-900 text-blue-300 border-blue-500/40',
    rotation: '-rotate-2',
    date: 'Hoy'
  }
];
