import { useEffect, useMemo, useState, useRef } from "react";
import { Play, Check, X, ChevronDown, ChevronsDown, Flame, Clock, ShieldCheck, Zap, BookOpen, Trophy, Crown, Library, Dices, Palette, Type, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import tshirt1 from "@/assets/Copa01.png";
import tshirt2 from "@/assets/Copa02.png";
import tshirt3 from "@/assets/Copa03.png";
import tshirt4 from "@/assets/Copa04.png";
import tshirt5 from "@/assets/Copa05.png";
import tshirt13 from "@/assets/Copa06.png";
import tshirt14 from "@/assets/Copa07.png";
import tshirt15 from "@/assets/Copa08.png";
import HeroCopa from "@/assets/HeroAdesivo.png";
import BonusCard from "@/components/BonusCard";
import PremiumOfferModal from "@/components/PremiumOfferModal";
import AtividadeImage from "@/assets/Atividades.png";
import AvaliacaoImage from "@/assets/Avaliacao.png";
import CuriosidadeImage from "@/assets/Curiosidade.png";
import DinamicaImage from "@/assets/Dinamica.png";
import Feedback01 from "@/assets/Relato01.png";
import Feedback02 from "@/assets/Relato02.png";
import Feedback03 from "@/assets/Relato03.png";
import Feedback04 from "@/assets/Relato04.png";
import GarantiaImage from "@/assets/Garantia.webp";
import GuiaBonus from "@/assets/GuiaBonus.png";
import MockupBonus from "@/assets/MockupBonus.png";
import NomesBonus from "@/assets/NomesBonus.png";
import BarBonus from "@/assets/BarBonus.png";
import InfantilBonus from "@/assets/InfantilBonus.png";
import FemBonus from "@/assets/FemBonus.png";
import OneBonus from "@/assets/100Bonus.png";

const CHECKOUT_URL = "#checkout";
const PREMIUM_CHECKOUT_URL = "https://pay.wiapy.com/6a03c77a7483096845580587";
const BASIC_CHECKOUT_URL = "https://pay.wiapy.com/sVm2xI1lE";
const DISCOUNTED_PREMIUM_CHECKOUT_URL = "https://pay.wiapy.com/g1NogNsgbN"; // URL com desconto para R$ 19,90

const useCountdown = (minutes: number) => {
  const target = useMemo(() => Date.now() + minutes * 60 * 1000, [minutes]);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { m: String(m).padStart(2, "0"), s: String(s).padStart(2, "0") };
};

const HeadlineFont = "font-['Arial Black'] tracking-wide font-black leading-[1.15]";

const HeroCTA = ({ children, href = CHECKOUT_URL, pulse = true }: { children: React.ReactNode; href?: string; pulse?: boolean }) => (
  <a
    href={href}
    className={`block w-full text-center rounded-2xl px-6 py-5 text-lg font-extrabold uppercase tracking-wide bg-gradient-urgency text-urgency-foreground shadow-urgency active:scale-[0.98] transition-transform ${pulse ? "animate-pulse-cta" : ""}`}
  >
    {children}
  </a>
);

const tshirts = [
  { src: tshirt1, alt: "Estampa Faith Over Fear" },
  { src: tshirt2, alt: "Estampa Cristo é Rei" },
  { src: tshirt3, alt: "Estampa Salmo 23" },
  { src: tshirt4, alt: "Estampa Filhos de Deus" },
  { src: tshirt5, alt: "Estampa Cristo é Rei" },
  { src: tshirt13, alt: "Estampa Cristo é Rei" },
  { src: tshirt14, alt: "Estampa Cristo é Rei" },
  { src: tshirt15, alt: "Estampa Cristo é Rei" },
];



const bonuses = [
  {
    title: "Guia de Aplicacao DTF UV em Copos",
    desc: "Passo a passo para aplicar adesivos DTF UV em copos com seguranca, evitando os erros mais comuns na aplicacao.",
    old: "R$19,90",
    imageSrc: GuiaBonus,
    isBonus: true,
  },
  {
    title: "Kit de Mockups Prontos para Divulgação",
    desc: "Mockups realistas de copos personalizados para postar no Instagram, WhatsApp e Marketplace sem precisar fotografar nada.",
    old: "R$19,90",
    imageSrc: MockupBonus,
    isBonus: true,
  },
  {
    title: "Pack de Combos para Bares e Eventos",
    desc: "Artes + ideias de kits para Bares, Resenhas, Churrascos, Empresas e Eventos da Copa.",
    old: "R$19,90",
    imageSrc: BarBonus,
    isBonus: true,
  },
  {
    title: "Pack de Nomes Brasileiros Prontos",
    desc: "Centenas de nomes já prontos em estilo torcida.",
    old: "R$27",
    imageSrc: NomesBonus,
    isBonus: true,
  },
  {
    title: "Pack Infantil da Copa",
    desc: "Artes fofas para copos infantis, lembrancinhas,  escolinhas e festas.",
    old: "R$27",
    imageSrc: InfantilBonus,
    isBonus: true,
  },
  {
    title: "Pack Torcida Feminina",
    desc: "Artes mais delicadas, modernas e estilosas voltadas ao público feminino.",
    old: "R$27",
    imageSrc: FemBonus,
    isBonus: true,
  },
  {
    title: "Lista de 100 Ideias de Produtos para Vender na Copa",
    desc: "100 ideias de produtos personalizados: copo americano, garrafa, squeeze, chaveiro, placa, brinde corporativo, kit churrasco e mais.",
    old: "R$27",
    imageSrc: OneBonus,
    isBonus: true,
  },
];

const faqs = [
  { q: "Como recebo o acesso?", a: "O acesso é imediato! Assim que o pagamento for confirmado, você receberá um e-mail com o link para baixar todas as atividades e bônus." },
  { q: "Preciso de programas especiais para abrir?", a: "Não. Todos os arquivos estão em formato PDF de alta qualidade, prontos para abrir em qualquer celular ou computador e imprimir em folha A4 comum." },
  { q: "O pagamento é seguro?", a: "Sim, utilizamos uma das maiores plataformas de pagamentos do Brasil. Seus dados estão 100% protegidos e a entrega é garantida." },
  { q: "E se eu não gostar do material?", a: "Não se preocupe. Você tem uma garantia de 30 dias. Se por qualquer motivo não ficar satisfeito, devolvemos todo o seu dinheiro." },
];

const feedbackImages = [
  { src: Feedback01, alt: "Feedback de cliente 1" },
  { src: Feedback02, alt: "Feedback de cliente 2" },
  { src: Feedback03, alt: "Feedback de cliente 3" },
  { src: Feedback04, alt: "Feedback de cliente 4" },
];

const Index = () => {
  const { m, s } = useCountdown(14);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleBasicClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPremiumModalOpen(true);
  };

  const handleConfirmPremium = () => {
    window.location.href = DISCOUNTED_PREMIUM_CHECKOUT_URL;
  };

  const handleDeclinePremium = () => {
    window.location.href = BASIC_CHECKOUT_URL;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tshirts.length);
    }, 2000); // Muda a imagem a cada 1 segundos
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = currentSlide * (carouselRef.current.children[0].clientWidth + 16); // 16px de gap
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentSlide]);

  return (
    <main className="bg-[#f0efef] text-foreground">
      {/* Top urgency bar */}
      <div className="w-full bg-gradient-urgency text-urgency-foreground text-center text-xs sm:text-sm font-bold py-2 px-3">
        <span className="inline-flex items-center gap-1.5">
          <Flame className="w-4 h-4" /> 50% OFF acaba em {m}:{s}
        </span>
      </div>

      <div className="mx-auto w-full max-w-[480px] px-4">
        {/* HERO */}
        <section className="pt-6 pb-10 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary border border-border px-3 py-1 text-xs font-semibold text-muted-foreground mb-4">
            ⭐⭐⭐⭐⭐ +4.300 avaliações
          </div>

          <h1 className={`${HeadlineFont} text-[44px] sm:text-5xl text-[#0000FF]`}>
            <span className="text-foreground">300 Artes Copa para Adesivos DTF UV </span> Prontas para Imprimir e Vender
            <br />
          </h1>

          <div className="mt-6 mb-8">
            <img 
              src={HeroCopa} 
              alt="Atividades da Copa" 
              className="w-full h-auto rounded-2xl"
              loading="eager"
            />
          </div>

         {/* INFO SECTION */}
        <section className="py-6">
          <div className="relative rounded-[2rem] bg-success/5 border border-border p-8 sm:p-10 text-center">
            {/* Decorative notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-2 bg-success/80 rounded-full"></div>

            <div className="space-y-6 text-lg sm:text-base text-foreground/90 leading-relaxed">
              <p>
               Receba 300 artes da Copa do Mundo para DTF UV, organizadas em cartelas com tamanhos prontos para imprimir, aplicar em copos personalizados e comecar a vender sem criar nada do zero.
              </p>
              
              <p className="font-bold text-lg sm:text-lg">
                 Material organizado em cartelas e com tamanhos prontos.
              </p>
            </div>
          </div>
        </section>

          <div className="mt-2">
            <HeroCTA>Quero ter acesso agora</HeroCTA>
            <p className="mt-3 text-center text-xs text-muted-foreground inline-flex w-full items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-success" /> Pagamento 100% seguro · Acesso imediato
            </p>
          </div>
        </section>

        {/* T-SHIRTS */}
        <section className="py-6 border-t border-border">
          <h2 className={`${HeadlineFont} text-3xl sm:text-4xl text-center text-[#000080]`}>
            Veja algumas das artes que você vai encontrar
          </h2>
          <p className="mt-2 text-sm text-muted-foreground text-center">Deslize para o lado pra ver mais</p>

          <div ref={carouselRef} className="mt-5 -mx-4 px-4 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {tshirts.map((t) => (
              <div
                key={t.alt}
                className="snap-center shrink-0 w-[85%] aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-border shadow-card-dark"
              >
                <img src={t.src} alt={t.alt} loading="lazy" className="w-full h-full object-contain block" />
              </div>
            ))}
          </div>
        </section>

        {/* HIGHLIGHTS SECTION */}
        <section className="mb-8">
          <div className="space-y-4">
            {[
              { 
                icon: "💰", 
                title: "Material Pronto para imprimir e vender", 
              },
              { 
                icon: "✂️", 
                title: "Cartelas prontas em tamanhos reais",
              },
              { 
                icon: "✏️", 
                title: "Editável no Canva",
              },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="flex gap-4 p-5 bg-white border border-border/60 border-l-4 border-l-[#008000] rounded-2xl shadow-sm"
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-black text-lg leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT'S INSIDE SECTION */}
        <section className="pt-6 border-t border-border">
          <div className="text-center mb-5 px-4">
            <h2 className={`${HeadlineFont} text-3xl sm:text-4xl text-[#000080] mb-1`}>
              Tudo que está dentro do Material
            </h2>
          </div>
          <div className="mt-4 mb-8 px-4">
            <img 
              src={HeroCopa} 
              alt="Preview do Material Copa Educativa" 
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </section>  
        
          {/* FEATURES LIST SECTION */}
        <section className="mt-4">
          <div className="space-y-3">
            {[
              { emoji: "✅", text: "300 artes da Copa do Mundo em PNG com fundo transparente." },
              { emoji: "✅", text: "Artes organizadas por tema: futebol, copa, bar, churrasco e dia de jogo." },
              { emoji: "✅", text: "Material completo e pronto para imprimir." },
              { emoji: "✅", text: "Tamanhos prontos para copo americano, long drink e garrafa." },
              { emoji: "✅", text: "Modelos editáveis no Canva para personalizações sob encomendas." },
              { emoji: "✅", text: "Material completo e pronto para vender. Acesse pelo celular, tablet ou computador." },
              { emoji: "🎁", text: "Bônus exclusivos no Plano Completo." },
            ].map((item, idx) => (
              <div 
                key={idx}
                className={`flex items-center gap-4 p-4 border border-2 border-black/10 rounded-2xl relative ${item.emoji === "🎁" ? "border-beam" : "bg-white"}`}
              >
                <div className="text-2xl shrink-0 z-10">
                  {item.emoji}
                </div>
                <span className="text-[15px] font-semibold text-slate-800 leading-snug z-10">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* BONUSES */}
        <section className="py-6 mt-4">
          <div className="bg-[#cc0000] -mx-4 px-6 py-10 mb-8 text-center text-white">
            <p className="text-lg sm:text-xl font-medium leading-tight mb-6">
              🎁 Além das <strong>300 Artes</strong>, ao adquirir o <br />
              Plano Completo você vai levar <strong>6 SUPER BÔNUS!</strong>
            </p>
            
            <p className="text-gold text-lg sm:text-xl font-bold italic underline mb-4">
              (se comprar depois não ganha)
            </p>
            
            <h2 className={`${HeadlineFont} text-2xl sm:text-3xl text-gold leading-tight uppercase`}>
              BÔNUS DISPONÍVEIS SOMENTE NO <br />
              PLANO COMPLETO
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            {(() => {
              let bonusCount = 0;
              return bonuses.map((b) => {
                if (b.isBonus) bonusCount++;
                return (
                  <BonusCard
                    key={b.title}
                    imageSrc={b.imageSrc}
                    bonusNumber={b.isBonus ? String(bonusCount).padStart(2, "0") : undefined}
                    title={b.title}
                    description={b.desc}
                    oldPrice={b.old}
                    showBonusLabel={b.isBonus}
                    showFreeBadge={b.isBonus}
                  />
                );
              });
            })()}
          </div>
        </section>

{/* TESTIMONIALS CAROUSEL */}
        <section className="py-10 border-t border-border">
          <h2 className={`${HeadlineFont} text-3xl sm:text-4xl text-center text-[#000080]`}>
            Depoimentos de Quem Já Usou
          </h2>
          <p className="mt-2 text-sm text-muted-foreground text-center">Deslize para o lado pra ver mais</p>

          <div className="mt-5 -mx-4 px-4 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {feedbackImages.map((f, index) => (
              <div
                key={index}
                className="snap-center shrink-0 w-[85%] aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-border shadow-card-dark"
              >
                <img src={f.src} alt={f.alt} loading="lazy" className="w-full h-full object-contain block" />
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="checkout" className="py-10 border-t border-border">
          <h2 className={`${HeadlineFont} text-3xl sm:text-4xl text-center text-[#000080]`}>
            Garanta o seu Acesso
          </h2>
          <div className="mt-6 space-y-5">

            {/* Basic */}
            <div className="rounded-2xl bg-card border border-border p-6 opacity-90 text-center flex flex-col items-center">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Básico</div>
              <div className="mt-2 flex items-end justify-center gap-2">
                <span className="text-4xl font-extrabold text-black">R$10,00</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-left self-start">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-muted-foreground mt-0.5" /> 300 Atividades da Copa</li>
                <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-500 mt-0.5" /> Sem Atualizações Semanais</li>
                <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-500 mt-0.5" /> Sem Bônus Inclusos</li>
              </ul>
              <button
                onClick={handleBasicClick}
                className="mt-5 block w-full text-center rounded-xl bg-success text-success-foreground border border-border px-5 py-3 font-bold text-sm active:scale-[0.98] transition"
              >
                Quero o básico
              </button>
              <div className="mt-8">
                <p className="text-red-500 font-black text-medium leading-snug uppercase">
                  ATENÇÃO: Temos uma <br />
                  opção <span className="underline decoration-2 underline-offset-4">ainda mais VANTAJOSA</span> <br />
                  para você! Veja logo abaixo
                </p>
                <div className="mt-2 flex flex-col items-center -space-y-4">
                  <ChevronsDown className="w-10 h-10 text-red-500 animate-bounce" />
                </div>
              </div>
            </div>

            {/* Premium */}
            <div className="relative rounded-3xl p-[2px]bg-gold shadow-gold overflow-hidden">
              <div className="bg-gold text-black py-1.5 flex items-center justify-center gap-2 font-black text-[11px] uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5" />
                <Trophy className="w-3.5 h-3.5" />
                MELHOR CUSTO-BENEFÍCIO
              </div>
              <div className="rounded-b-[22px] bg-card p-6 text-center flex flex-col items-center">
                <div className="text-xs font-bold uppercase tracking-wider text-black mt-2">Premium</div>
                <div className="mt-2 flex items-end justify-center gap-2">
                  <span className="text-base line-through text-muted-foreground">De R$129</span>
                </div>
                <div className="flex items-end justify-center gap-2">
                  <span className="text-6xl font-extrabold text-black mt-2">R$19,90</span>
                </div>

                <div className="mt-2">
                  <span className="text-xl text-foreground/80">ou 3x de R$ 7,23</span>
                  <p className="text-sm text-muted-foreground italic mt-0.5">Pagamento único, sem mensalidades.</p>
                </div>

                <ul className="mt-5 space-y-2.5 text-medium text-left self-start">
                  {[
                    "300 Atividades da Copa",
                    "Figurinhas Editáveis com Foto dos Alunos",
                    "Dinâmicas Divertidas",
                    "Banco de Avaliações",
                    "Plano de Aulas",
                    "Caderno de Colorir",
                    "50 Curiosidades da Copa",
                    "Atualizações Semanais",
                  ].map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-success text-success-foreground shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 w-full">
                  <HeroCTA href={PREMIUM_CHECKOUT_URL} pulse={false}>
                    Quero o plano premium
                  </HeroCTA>
                </div>

                <div className="mt-4 flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5 text-success" />
                    Compra 100% segura
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="py-12 px-6 rounded-3xl bg-success/5 border border-border text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <img 
              src={GarantiaImage} 
              alt="Selo de Garantia 30 Dias" 
              className="w-32 h-32 object-contain animate-float"
            />
            <div>
              <h2 className={`${HeadlineFont} text-3xl sm:text-4xl text-black mb-4`}>
                Garantia de Satisfação Total
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  Estamos tão certos de que as <span className="text-foreground font-bold">Atividades da Copa</span> vão transformar as suas aulas e facilitar sua rotina, que oferecemos uma garantia de satisfação total por <span className="text-black font-bold text-lg">30 dias</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10">
          <h2 className={`${HeadlineFont} text-3xl sm:text-4xl text-center`}>
            Perguntas Frequentes
          </h2>

          <Accordion type="single" collapsible className="mt-5">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-bold text-base hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8">
            <HeroCTA href={PREMIUM_CHECKOUT_URL}>Quero meu acesso premium</HeroCTA>
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border">
          © {new Date().getFullYear()} Atividades da Copa · Todos os direitos reservados
        </footer>
      </div>

      <PremiumOfferModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        onConfirm={handleConfirmPremium}
        onDecline={handleDeclinePremium}
        premiumUrl={DISCOUNTED_PREMIUM_CHECKOUT_URL}
      />
    </main>
  );
};

export default Index;