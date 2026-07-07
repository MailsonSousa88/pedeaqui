import logoSrc from "@/assets/logo-pedeaqui-traced.png";

interface LogoProps {
  className?: string;
  alt?: string;
}

export default function Logo({ className = "h-9", alt = "PedeAqui" }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt={alt}
      className={className}
      draggable={false}
    />
  );
}
