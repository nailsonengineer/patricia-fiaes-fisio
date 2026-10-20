import React from 'react';
import { PROFESSIONAL_DATA } from '../../data/professional';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

import {
  CalendarDays,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

const Scheduling = () => {
  const googleCalendarUrl = PROFESSIONAL_DATA.googleCalendarUrl;

  const isGoogleCalendarConfigured =
    typeof googleCalendarUrl === 'string' &&
    googleCalendarUrl.startsWith(
      'https://calendar.google.com/calendar/appointments/schedules/'
    );

  const whatsappUrl = buildWhatsAppUrl(
    PROFESSIONAL_DATA.phone,
    'Consulta Geral'
  );

  return (
    <section
      id="agendamento"
      aria-labelledby="agendamento-titulo"
      className="relative overflow-hidden bg-[#F8FAF9] py-24 sm:py-28 lg:py-32"
    >
      {/* ELEMENTOS DECORATIVOS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-teal-100/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* CABEÇALHO */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <div className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-teal-700/50" />

            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-teal-800">
              Agendamento Online
            </span>

            <span className="h-px w-8 bg-teal-700/50" />
          </div>

          <h2
            id="agendamento-titulo"
            className="font-serif text-4xl font-semibold leading-tight tracking-tight text-teal-950 sm:text-5xl lg:text-[54px]"
          >
            O primeiro passo para
            <br className="hidden sm:block" />

            <span className="font-normal italic text-teal-700">
              {' '}cuidar de você.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Reserve um momento para sua saúde. Escolha o dia e
            horário mais convenientes e agende seu atendimento
            de forma simples, rápida e organizada.
          </p>

        </div>

        {/* CARD PRINCIPAL */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-[28px] border border-teal-900/10 bg-white shadow-[0_20px_70px_-35px_rgba(15,70,65,0.22)] lg:grid-cols-2">

          {/* COLUNA ESQUERDA */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-teal-950 p-8 text-white sm:p-12 lg:p-14">

            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full border border-white/10"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-80 w-80 translate-x-1/3 -translate-y-1/3 rounded-full border border-white/5"
            />

            <div className="relative">

              <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                <CalendarDays
                  className="h-6 w-6 text-teal-100"
                  strokeWidth={1.5}
                />
              </div>

              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
                Atendimento individualizado
              </span>

              <h3 className="max-w-md font-serif text-3xl font-medium leading-snug sm:text-4xl">
                Sua saúde merece

                <span className="block font-normal italic text-teal-200">
                  atenção em cada detalhe.
                </span>
              </h3>

              <p className="mt-6 max-w-md text-sm leading-7 text-teal-50/75 sm:text-base">
                Cada atendimento é pensado para compreender
                suas necessidades e oferecer um cuidado
                fisioterapêutico individualizado, respeitando
                seu ritmo e seus objetivos.
              </p>

              {/* BENEFÍCIOS */}
              <div className="mt-10 space-y-6">

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Clock3 className="h-5 w-5 text-teal-200" />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold">
                      Escolha seu melhor horário
                    </h4>

                    <p className="mt-1 text-sm leading-relaxed text-teal-50/65">
                      Consulte os horários disponíveis online.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <CheckCircle2 className="h-5 w-5 text-teal-200" />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold">
                      Agendamento simplificado
                    </h4>

                    <p className="mt-1 text-sm leading-relaxed text-teal-50/65">
                      Reserve sua consulta em poucos passos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <ShieldCheck className="h-5 w-5 text-teal-200" />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold">
                      Confirmação por e-mail
                    </h4>

                    <p className="mt-1 text-sm leading-relaxed text-teal-50/65">
                      Receba os detalhes da sua reserva.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* ASSINATURA */}
            <div className="relative mt-14 border-t border-white/15 pt-7">

              <p className="font-serif text-xl italic">
                Patrícia Fiaes
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-teal-200/70">
                Fisioterapeuta · CREFITO {PROFESSIONAL_DATA.crefito}
              </p>

            </div>

          </div>

          {/* COLUNA DIREITA */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">

            <div className="mb-8">

              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-800">
                <span className="h-2 w-2 rounded-full bg-teal-600" />
                Agendamento online
              </span>

              <h3 className="font-serif text-3xl font-semibold leading-tight text-teal-950">
                Agende sua consulta
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Escolha um horário disponível e preencha seus
                dados para concluir o agendamento.
              </p>

            </div>

            {/* PASSO A PASSO */}
            <div className="mb-10 space-y-6">

              {[
                {
                  number: '01',
                  title: 'Escolha a data',
                  description: 'Visualize os dias disponíveis.',
                },
                {
                  number: '02',
                  title: 'Selecione o horário',
                  description: 'Escolha o horário mais conveniente.',
                },
                {
                  number: '03',
                  title: 'Confirme sua reserva',
                  description: 'Informe seus dados e finalize.',
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="flex items-center gap-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-teal-900/10 bg-teal-50 text-sm font-semibold text-teal-800">
                    {step.number}
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {step.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}

            </div>

            <div className="mb-8 h-px w-full bg-slate-100" />

            {/* BOTÃO PRINCIPAL */}
            {isGoogleCalendarConfigured ? (
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-teal-900 px-6 py-4 text-center text-sm font-semibold text-white shadow-lg shadow-teal-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
              >
                <CalendarDays className="h-5 w-5 shrink-0" />

                Agendar minha consulta

                <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-teal-900 px-6 py-4 text-center text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-teal-800"
              >
                <MessageCircle className="h-5 w-5" />

                Agendar pelo WhatsApp

                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}

            {/* INFORMAÇÃO SOBRE O LINK */}
            {isGoogleCalendarConfigured && (
              <p className="mt-4 text-center text-xs text-slate-500">
                O calendário será aberto em uma nova aba.
              </p>
            )}

            {/* AVISO */}
            <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50 p-4">

              <div className="flex items-start gap-3">

                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />

                <p className="text-xs leading-6 text-slate-500">
                  O agendamento é realizado pelo Google Calendar.
                  Após a confirmação, você receberá os detalhes
                  da consulta no e-mail informado.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* CONTATO ALTERNATIVO */}
        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-teal-900/10 pt-8 text-center sm:flex-row sm:text-left">

          <p className="text-sm text-slate-500">
            Precisa de orientação antes de agendar?
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-teal-900 transition hover:text-teal-700"
          >
            Entre em contato pelo WhatsApp

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

        </div>

      </div>
    </section>
  );
};

export default Scheduling;