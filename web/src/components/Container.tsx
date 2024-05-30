const Container = ({ children, forwardRef, ...rest }: any) => {
  return (
    <div className={`max-w-7xl mx-auto px-7 mt-[40px] ${rest.className}`} ref={forwardRef}>
      {children}
    </div>
  );
};

export default Container;