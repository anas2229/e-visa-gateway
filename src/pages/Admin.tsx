import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle, Clock, Users, FileText, LayoutDashboard, Check } from 'lucide-react';

const Admin = () => {
  const { user, applications, approveApplication } = useAuth();
  const navigate = useNavigate();

  if (!user || !user.isAdmin) {
    navigate('/');
    return null;
  }

  const pendingCount = applications.filter(a => a.status === 'processing').length;
  const approvedCount = applications.filter(a => a.status === 'accepted').length;

  const handleApprove = (applicationId: string) => {
    approveApplication(applicationId);
    toast.success('تمت الموافقة على الطلب بنجاح');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 animate-fade-up">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-elegant">
                <LayoutDashboard className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">لوحة تحكم المدير</h1>
                <p className="text-muted-foreground">إدارة طلبات التأشيرات</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-card rounded-2xl shadow-card border border-border p-6 animate-fade-up">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                  <p className="text-3xl font-bold text-foreground">{applications.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-card border border-border p-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">قيد المعالجة</p>
                  <p className="text-3xl font-bold text-warning">{pendingCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-card border border-border p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">تمت الموافقة</p>
                  <p className="text-3xl font-bold text-success">{approvedCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                جميع الطلبات
              </h2>
            </div>

            {applications.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">لا توجد طلبات حتى الآن</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">الاسم</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">البريد الإلكتروني</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">رقم الجواز</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">الحالة</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">الإجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-foreground">{app.fullName}</div>
                          <div className="text-sm text-muted-foreground">{app.userName}</div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{app.email}</td>
                        <td className="px-6 py-4 font-mono text-foreground">{app.passportNumber}</td>
                        <td className="px-6 py-4">
                          {app.status === 'accepted' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-success/10 text-success">
                              <CheckCircle className="w-4 h-4" />
                              تمت الموافقة
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-warning/10 text-warning">
                              <Clock className="w-4 h-4" />
                              قيد المعالجة
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {app.status === 'processing' ? (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleApprove(app.id)}
                              className="gap-2"
                            >
                              <Check className="w-4 h-4" />
                              قبول
                            </Button>
                          ) : (
                            <span className="text-sm text-muted-foreground">تم التأكيد</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
