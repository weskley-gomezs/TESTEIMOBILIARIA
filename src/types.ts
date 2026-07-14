export const EMPRESA_ID = "";

export interface Property {
  id: string;
  titulo: string;
  bairro: string;
  cidade: string;
  valor: number;
  quartos: number;
  banheiros: number;
  area: number;
  image: string;
  tipo: 'Casa' | 'Apartamento' | 'Cobertura' | 'Studio' | 'Loft';
  descricao: string;
  caracteristicas: string[];
}

export interface LeadPayload {
  nome: string;
  telefone: string;
  email: string;
  origem: string;
  empresaId: string;
  dados: {
    imovelId: string;
    titulo: string;
    valor: string;
  };
}

export const PROPERTIES: Property[] = [
  {
    id: "prop-1",
    titulo: "Cobertura Duplex Jardins",
    bairro: "Jardins",
    cidade: "São Paulo",
    valor: 4200000,
    quartos: 4,
    banheiros: 5,
    area: 350,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    tipo: "Cobertura",
    descricao: "Exclusiva cobertura duplex com vista panorâmica definitiva de 360º para o bairro dos Jardins. Pavimento superior totalmente dedicado ao lazer, contando com piscina privativa aquecida, deck em madeira nobre, churrasqueira gourmet e living integrado. Acabamentos de altíssimo padrão, mármores importados e marcenaria sob medida em todos os cômodos.",
    caracteristicas: ["Piscina Privativa", "Deck de Madeira", "Vista Panorâmica", "Automação Residencial", "4 Vagas de Garagem"]
  },
  {
    id: "prop-2",
    titulo: "Casa Contemporânea Alphaville",
    bairro: "Alphaville",
    cidade: "Barueri",
    valor: 3500000,
    quartos: 4,
    banheiros: 4,
    area: 420,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    tipo: "Casa",
    descricao: "Projeto arquitetônico moderno assinado por arquiteto renomado. Living com pé-direito duplo de 6 metros totalmente integrado ao espaço gourmet e piscina com borda infinita. Cozinha integrada equipada com eletrodomésticos de última geração, aspiração central de pó, aquecimento solar de água e acabamentos de altíssima qualidade.",
    caracteristicas: ["Pé-direito Duplo", "Piscina Borda Infinita", "Aquecimento Solar", "Espaço Gourmet", "Suíte Master com Closet"]
  },
  {
    id: "prop-3",
    titulo: "Apartamento Vista Mar Leblon",
    bairro: "Leblon",
    cidade: "Rio de Janeiro",
    valor: 5800000,
    quartos: 3,
    banheiros: 3,
    area: 180,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    tipo: "Apartamento",
    descricao: "Apartamento espetacular no quadrilátero mais cobiçado do Leblon, a pouquíssimos passos da praia. Totalmente reformado com projeto de iluminação personalizado, ar condicionado central do tipo VRF invisível, ampla varanda com fechamento em cortina de vidro e vista frontal definitiva para o mar. Planta circular com excelente ventilação.",
    caracteristicas: ["Vista para o Mar", "Varanda Gourmet", "Ar Condicionado VRF", "Portaria 24h", "2 Vagas Cobertas"]
  },
  {
    id: "prop-4",
    titulo: "Loft Industrial Vila Madalena",
    bairro: "Vila Madalena",
    cidade: "São Paulo",
    valor: 1250000,
    quartos: 1,
    banheiros: 2,
    area: 85,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    tipo: "Loft",
    descricao: "Loft autêntico com design de inspiração nova-iorquina em uma das ruas mais arborizadas da Vila Madalena. Conta com paredes de tijolos aparentes originais, tubulações de metal galvanizado, piso em cimento queimado resinado e imensas janelas de ferro que inundam o ambiente com luz natural. Cozinha de conceito aberto e suíte em mezanino.",
    caracteristicas: ["Estilo Industrial", "Piso Cimento Queimado", "Mezanino", "Tijolo Aparentado", "Condomínio Moderno"]
  },
  {
    id: "prop-5",
    titulo: "Mansão Minimalista Joá",
    bairro: "Joá",
    cidade: "Rio de Janeiro",
    valor: 8900000,
    quartos: 5,
    banheiros: 6,
    area: 650,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    tipo: "Casa",
    descricao: "Debruçada sobre o mar do Joá, esta obra de arte da arquitetura minimalista oferece privacidade absoluta e uma das paisagens mais deslumbrantes do Rio de Janeiro. Paredes inteiras em vidro de alta performance integram a paisagem oceânica aos cômodos sociais. Spa privativo com sauna, hidromassagem externa e heliporto próximo.",
    caracteristicas: ["Vista Mar Infinita", "Spa Privativo", "Sauna Seca", "Privacidade Absoluta", "Heliponto no Condomínio"]
  },
  {
    id: "prop-6",
    titulo: "Studio Moderno Itaim Bibi",
    bairro: "Itaim Bibi",
    cidade: "São Paulo",
    valor: 850000,
    quartos: 1,
    banheiros: 1,
    area: 45,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    tipo: "Studio",
    descricao: "Perfeito para investimento ou moradia urbana qualificada. Localizado no coração do Itaim Bibi, próximo aos principais polos corporativos e gastronômicos da cidade. Planta inteligente com marcenaria planejada integrada de forma a otimizar ao máximo o espaço, fechadura eletrônica por biometria e ampla varanda com excelente incidência solar.",
    caracteristicas: ["Fechadura Biométrica", "Marcenaria Planejada", "Lazer Completo no Rooftop", "Lavanderia Omo no Prédio", "Coworking Privativo"]
  }
];

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
}
