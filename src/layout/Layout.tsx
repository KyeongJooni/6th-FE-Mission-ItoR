import Sidebar from '@/layout/Sidebar';
import { PageHeader } from '@/components';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { useSidebar, usePageHeaderType, useEditProfile } from '@/hooks';
import { useAuth } from '@/api/user/userQuery';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const { isSidebarOpen, sidebarRef, toggleSidebar } = useSidebar();
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const pageHeaderType = usePageHeaderType();
  const { handleEdit, handleCancel } = useEditProfile();

  const isBlogDetailPage = location.pathname.startsWith('/blog/') && location.pathname !== '/blog/write';

  return (
    <div className="w-full">
      {isBlogDetailPage && <ScrollProgress />}
      <PageHeader type={pageHeaderType} onHamburgerClick={toggleSidebar} onEdit={handleEdit} onCancel={handleCancel} />
      <div ref={sidebarRef} className={`sidebar-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isLoggedIn={isLoggedIn} />
      </div>
      <div className="flex w-full flex-col items-center pt-16">
        <Outlet />
      </div>
    </div>
  );
}
