import { useMemo } from 'react';
import { useLocation } from 'react-router';

export default function useNavItems() {
  const { pathname } = useLocation();

  // Get screen title from url
  const screenTitle = useMemo(() => {
    return pathname.split('/')[3];
  }, [pathname]);

  // Default navigation items for KOC profile
  const navigation = [
    {
      url: 'over-view',
      title: 'Overview',
      urlMatch: 'koc-profile/:id/overview',
    },
    {
      url: 'tiktok',
      title: 'TikTok',
      urlMatch: 'koc-profile/:id/tiktok',
    },
    {
      url: 'youtube',
      title: 'Youtube',
      urlMatch: 'koc-profile/:id/youtube',
    },
    {
      url: 'facebook',
      title: 'Facebook',
      urlMatch: 'koc-profile/:id/facebook',
    },
    {
      url: 'instagram',
      title: 'Instagram',
      urlMatch: 'koc-profile/:id/instagram',
    },
    {
      url: 'other-content',
      title: 'Other Content',
      urlMatch: 'koc-profile/:id/otherContent',
    },
    {
      url: 'product-sold',
      title: 'Product Sold',
      urlMatch: 'koc-profile/:id/productSold',
    },
  ];

  return {
    navItems: navigation.map((item) => ({
      ...item,
      active: item.url === screenTitle,
    })),
  };
}
