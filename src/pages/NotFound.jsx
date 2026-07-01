import Page from '../components/Page'
import { Label, Action, CornerTicks } from '../components/ui/Frame'

export default function NotFound() {
  return (
    <Page title="Page introuvable — WAHM" description="La page demandée n'existe pas.">
      <section className="flex min-h-[78vh] items-center bg-surface px-5 pb-24 pt-[120px] md:pt-[150px]">
        <div className="mx-auto w-full max-w-[1440px] px-0 md:px-10">
          <div className="relative border border-line/[0.1] bg-surface-2 px-7 py-16 md:px-16 md:py-24">
            <CornerTicks />
            <Label>Erreur 404</Label>
            <p className="mt-6 font-display text-[96px] font-black leading-[0.9] text-fg md:text-[140px]">404<span className="text-wahm-orange">.</span></p>
            <h1 className="mt-4 font-display text-[24px] font-extrabold uppercase tracking-[-0.01em] text-fg md:text-[30px]">Page introuvable</h1>
            <p className="mt-3 max-w-[460px] font-sans text-[15.5px] leading-[1.6] text-muted">La page que vous cherchez a peut-être été déplacée ou n'existe pas.</p>
            <div className="mt-9">
              <Action to="/" variant="filled" arrow>Retour à l'accueil</Action>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}
