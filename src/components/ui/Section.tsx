import { cn } from '../../lib/utils';

/**
 * A page band: full-width background with a centered container inside.
 * `className` styles the band; `containerClassName` styles the container.
 */
export default function Section({
  children,
  className,
  containerClassName,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <section className={cn('py-10 md:py-12 bg-white', className)} id={id}>
      <div className={cn('site-container', containerClassName)}>{children}</div>
    </section>
  );
}
