import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const Modal = ({ isOpen, onClose, title, children }) => {
  const reduce = useReducedMotion();

  const titleId = useId();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Guarda o onClose mais recente sem reiniciar os efeitos a cada render
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Quando true, toca a animação de saída e só depois chama onClose
  const [closing, setClosing] = useState(false);

  const requestClose = useCallback(() => {
    if (reduce) {
      onCloseRef.current?.();
      return;
    }
    setClosing(true);
  }, [reduce]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement = document.activeElement;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        requestClose();
        return;
      }

      // Mantém a navegação por Tab dentro do modal.
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) {
          event.preventDefault();
          modalRef.current.focus();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === firstElement
        ) {
          event.preventDefault();
          lastElement.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastElement
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);

      previouslyFocusedElement?.focus?.();
    };
  }, [isOpen, requestClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      requestClose();
    }
  };

  const spin = (duration, reverse = false) =>
    reduce
      ? {}
      : {
        animate: { rotate: reverse ? -360 : 360 },
        transition: { duration, repeat: Infinity, ease: 'linear' },
      };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: closing ? 0 : 1 }}
      transition={{ duration: closing ? 0.25 : 0.3, ease: 'easeOut' }}
      onAnimationComplete={() => {
        if (closing) onCloseRef.current?.();
      }}
      className="
        fixed inset-0 z-100
        flex items-center justify-center
        overflow-y-auto
        bg-[#30251D]/75
        p-4
        backdrop-blur-sm
        sm:p-6
      "
      onMouseDown={handleBackdropClick}
    >
      {/* JANELA PRINCIPAL */}
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={reduce ? false : { opacity: 0, y: 36, scale: 0.95 }}
        animate={
          closing
            ? { opacity: 0, y: 20, scale: 0.97 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={
          closing
            ? { duration: 0.25, ease: 'easeIn' }
            : { duration: 0.55, ease: EASE }
        }
        className="
          relative
          my-auto
          flex w-full max-w-2xl
          flex-col
          overflow-hidden
          rounded-3xl
          border border-[#E8DFD3]
          bg-[#FFFEFB]
          shadow-[0_30px_90px_rgba(48,37,29,0.30)]
          outline-none
          sm:rounded-[28px]
        "
      >
        {/* DETALHE DOURADO */}
        <div
          aria-hidden="true"
          className="
            relative
            h-1 w-full shrink-0
            overflow-hidden
            bg-linear-to-r
            from-[#A9855D]
            via-[#C4A078]
            to-[#E8DFD3]
          "
        >
          {/* brilho que percorre a barra */}
          {!reduce && (
            <motion.span
              className="absolute inset-y-0 left-0 w-1/4 bg-white/40"
              animate={{ x: ['-100%', '500%'] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: 'easeInOut',
              }}
            />
          )}
        </div>

        {/* CABEÇALHO */}
        <div
          className="
            relative
            flex shrink-0
            items-center justify-between
            gap-5
            overflow-hidden
            border-b border-[#C4A078]/20
            bg-[#49382E]
            px-5 py-5
            sm:px-8 sm:py-6
          "
        >
          {/* DECORAÇÃO */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-10 -top-16
              h-36 w-36
              rounded-full
              border border-[#C4A078]/15
            "
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-52 w-52"
          >
            <motion.div
              {...spin(80)}
              className="relative h-full w-full rounded-full border border-dashed border-[#C4A078]/20"
            >
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C4A078]/80" />
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="relative min-w-0"
          >
            <span
              className="
                mb-2 block
                text-[10px]
                font-semibold uppercase
                tracking-[0.2em]
                text-[#C4A078]
              "
            >
              Patrícia Fiaes
            </span>

            <h3
              id={titleId}
              className="
                font-serif
                text-xl font-medium
                leading-snug
                text-[#FFFEFB]
                sm:text-2xl
              "
            >
              {title}
            </h3>
          </motion.div>

          {/* FECHAR */}
          <motion.button
            ref={closeButtonRef}
            type="button"
            onClick={requestClose}
            aria-label="Fechar janela"
            whileTap={{ scale: 0.9 }}
            className="
              relative
              flex h-10 w-10
              shrink-0
              items-center justify-center
              rounded-full
              border border-[#C4A078]/25
              bg-[#C4A078]/10
              text-[#F3EEE7]
              transition-all duration-300
              hover:rotate-90
              hover:border-[#C4A078]
              hover:bg-[#C4A078]/25
              hover:text-[#FFFEFB]
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#C4A078]
            "
          >
            <X size={19} strokeWidth={1.7} />
          </motion.button>
        </div>

        {/* CONTEÚDO */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="
            min-h-0
            max-h-[calc(100dvh-170px)]
            overflow-y-auto
            overscroll-contain
            bg-[#FFFEFB]
            px-5 py-6
            text-[#62574E]
            sm:px-8 sm:py-8
          "
        >
          {children}
        </motion.div>

        {/* RODAPÉ DECORATIVO */}
        <div
          className="
            flex shrink-0
            items-center justify-center
            gap-2
            border-t border-[#E8DFD3]
            bg-[#F7F6F0]
            px-5 py-3
          "
        >
          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="h-px w-5 origin-right bg-[#C4A078]"
          />

          <span
            className="
              text-[10px]
              font-medium uppercase
              tracking-[0.15em]
              text-[#A9855D]
            "
          >
            Cuidado em cada detalhe
          </span>

          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="h-px w-5 origin-left bg-[#C4A078]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;