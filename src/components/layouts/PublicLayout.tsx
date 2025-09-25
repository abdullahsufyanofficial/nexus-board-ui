import { Outlet } from 'react-router-dom';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { PublicFooter } from '@/components/navigation/PublicFooter';
import { motion } from 'framer-motion';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />
      <motion.main 
        className="flex-1 pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;