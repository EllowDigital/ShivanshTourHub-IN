interface Props {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: Props) => (
  <div className="text-center mb-8 sm:mb-12">
    <div className="section-heading-mark" aria-hidden="true">✦</div>
    <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-2 sm:mt-3 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
