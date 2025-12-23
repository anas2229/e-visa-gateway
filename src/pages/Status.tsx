import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, FileText, Calendar, Mail, CreditCard, User } from 'lucide-react';

const Status = () => {
  const { user, getUserApplication } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const application = getUserApplication();

  if (!application) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center animate-fade-up">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">لا توجد طلبات</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              لم تقم بتقديم أي طلب تأشيرة بعد. قدم طلبك الآن للبدء.
            </p>
            <Button variant="hero" size="lg" onClick={() => navigate('/apply')}>
              تقديم طلب جديد
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const isAccepted = application.status === 'accepted';
  const statusIcon = isAccepted ? CheckCircle : Clock;
  const StatusIcon = statusIcon;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 animate-fade-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">حالة طلب التأشيرة</h1>
            <p className="text-muted-foreground text-lg">
              تابع حالة طلبك والتحديثات
            </p>
          </div>

          {/* Status Card */}
          <div className={`rounded-2xl p-8 md:p-12 text-center mb-8 animate-fade-up ${
            isAccepted 
              ? 'bg-success/10 border-2 border-success/30' 
              : 'bg-warning/10 border-2 border-warning/30'
          }`}>
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isAccepted ? 'bg-success/20' : 'bg-warning/20'
            }`}>
              <StatusIcon className={`w-12 h-12 ${isAccepted ? 'text-success' : 'text-warning'}`} />
            </div>
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${
              isAccepted ? 'text-success' : 'text-warning'
            }`}>
              {isAccepted ? 'تم قبول تأشيرتك!' : 'طلبك قيد المعالجة'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {isAccepted 
                ? 'تهانينا! تمت الموافقة على طلب التأشيرة الخاص بك.'
                : 'يتم مراجعة طلبك حالياً. سيتم إعلامك عند اتخاذ القرار.'
              }
            </p>
          </div>

          {/* Application Details */}
          <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              تفاصيل الطلب
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">الاسم الكامل</p>
                  <p className="font-semibold text-foreground">{application.fullName}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">البريد الإلكتروني</p>
                  <p className="font-semibold text-foreground">{application.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">رقم جواز السفر</p>
                  <p className="font-semibold text-foreground">{application.passportNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">تاريخ التقديم</p>
                  <p className="font-semibold text-foreground">
                    {new Date(application.submittedAt).toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-8 bg-card rounded-2xl shadow-card border border-border p-6 md:p-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold text-foreground mb-6">مراحل الطلب</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-success-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">تم استلام الطلب</p>
                  <p className="text-sm text-muted-foreground">تم تقديم طلبك بنجاح</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isAccepted ? 'bg-success' : 'bg-warning animate-pulse'
                }`}>
                  <Clock className={`w-5 h-5 ${isAccepted ? 'text-success-foreground' : 'text-warning-foreground'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">مراجعة الطلب</p>
                  <p className="text-sm text-muted-foreground">
                    {isAccepted ? 'تمت مراجعة الطلب' : 'جاري مراجعة الطلب من قبل الجهات المختصة'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isAccepted ? 'bg-success' : 'bg-muted'
                }`}>
                  <CheckCircle className={`w-5 h-5 ${isAccepted ? 'text-success-foreground' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${isAccepted ? 'text-foreground' : 'text-muted-foreground'}`}>
                    الموافقة على التأشيرة
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isAccepted ? 'تمت الموافقة على تأشيرتك!' : 'في انتظار القرار النهائي'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Status;
