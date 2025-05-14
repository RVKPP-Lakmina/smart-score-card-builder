interface LinkProps {
  onPageChange: () => void;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ children, onPageChange }: LinkProps) => {
  return (
    <span
      onClick={onPageChange}
      className=" cursor-pointer font-medium inline-flex items-center"
    >
      {children}
    </span>
  );
};

export default Link;
