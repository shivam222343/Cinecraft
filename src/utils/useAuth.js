import { useCallback, useEffect, useMemo, useState } from 'react';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('adminToken');
    const u = localStorage.getItem('adminUser');
    setToken(t);
    setUser(u ? JSON.parse(u) : null);
  }, []);

  const isAuthenticated = useMemo(() => Boolean(token && user), [token, user]);
  const isAdmin = useMemo(() => user?.role === 'admin', [user]);

  const login = useCallback((data) => {
    if (data?.token) localStorage.setItem('adminToken', data.token);
    if (data?.user || data?.data) {
      // backend returns { data: user, token }
      localStorage.setItem('adminUser', JSON.stringify(data.user || data.data));
    }
    setToken(localStorage.getItem('adminToken'));
    const u = localStorage.getItem('adminUser');
    setUser(u ? JSON.parse(u) : null);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setToken(null);
    setUser(null);
  }, []);

  return { user, token, isAuthenticated, isAdmin, login, logout };
}
