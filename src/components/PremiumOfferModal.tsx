import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Gift, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onDecline: () => void;
  premiumUrl: string;
}

const PremiumOfferModal: React.FC<PremiumOfferModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onDecline,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] rounded-3xl p-8 border-none bg-white overflow-hidden sm:max-w-[400px]">
        <div className="flex flex-col items-center text-center">
          {/* Gift Icon */}
          <div className="w-16 h-16 bg-[#e8fbf1] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
            <Gift className="w-8 h-8 text-[#22c55e]" />
          </div>

          <h2 className="text-[22px] font-black text-slate-900 leading-tight mb-2">
            Leve o plano PREMIUM pagando MAIS BARATO!
          </h2>
          
          <div className="w-8 h-1 bg-[#22c55e] rounded-full mb-6"></div>

          <div className="mb-2">
            <span className="text-slate-400 font-medium">De </span>
            <span className="text-[#ef4444] line-through font-bold text-lg">R$ 19,90</span>
          </div>

          <div className="text-[44px] font-black text-slate-900 leading-none mb-1">
            R$ 14,90
          </div>

          <div className="text-[#22c55e] font-black text-sm tracking-wider mb-8">
            ECONOMIZE AGORA!
          </div>

          <ul className="w-full space-y-3 mb-8 text-left">
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-[#e8fbf1] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-[#22c55e] stroke-[3]" />
              </div>
              <span className="text-[15px] font-semibold text-slate-600 leading-tight">
                Todos bônus e benefícios do Plano Premium
              </span>
            </li>
          </ul>

          <div className="w-full space-y-3">
            <Button
              onClick={onConfirm}
              className="w-full h-14 bg-[#00cc00] hover:bg-[#00b300] text-white rounded-2xl text-lg font-black uppercase tracking-wide shadow-[0_4px_0_rgb(0,153,0)] active:translate-y-1 active:shadow-none transition-all"
            >
              Quero meu acesso premium!
            </Button>
            
            <button
              onClick={onDecline}
              className="w-full h-12 text-slate-400 font-medium text-[15px] hover:text-slate-600 transition-colors"
            >
              Não, obrigado. Quero seguir sem isso.
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumOfferModal;
