import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { User, Mail, CreditCard, Send, CheckCircle, FileText } from 'lucide-react';

const Apply = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    passportNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { user, submitApplication, getUserApplication } = useAuth();
  const navigate = useNavigate();

  const existingApplication = getUserApplication();

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (existingApplication) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center animate-fade-up">
            <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-warning" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">لديك طلب مقدم بالفعل</h1>
            <p className="text-muted-foreground mb-8">
              لقد قمت بتقديم طلب تأشيرة سابقاً. يمكنك متابعة حالة طلبك من صفحة حالة الطلب.
            </p>
            <Button variant="hero" size="lg" onClick={() => navigate('/status')}>
              متابعة حالة الطلب
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center animate-fade-up">
            <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">تم تقديم طلبك بنجاح!</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              شكراً لك. سيتم مراجعة طلبك من قبل الجهات المختصة. يمكنك متابعة حالة طلبك في أي وقت.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" onClick={() => navigate('/status')}>
                متابعة حالة الطلب
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/')}>
                العودة للرئيسية
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    submitApplication(formData.fullName, formData.email, formData.passportNumber);
    toast.success('تم تقديم طلبك بنجاح');
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 animate-fade-up">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-elegant">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">تقديم طلب تأشيرة</h1>
            <p className="text-muted-foreground text-lg">
              أدخل بياناتك بشكل صحيح لتقديم طلب التأشيرة
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">الاسم بالكامل</label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="أدخل اسمك كما هو في جواز السفر"
                    className="pr-12"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    className="pr-12"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">رقم جواز السفر</label>
                <div className="relative">
                  <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="أدخل رقم جواز السفر"
                    className="pr-12"
                    value={formData.passportNumber}
                    onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      جاري تقديم الطلب...
                    </span>
                  ) : (
                    <>
                      تقديم الطلب
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 p-6 rounded-xl bg-muted/30 border border-border animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-semibold text-foreground mb-3">ملاحظات هامة:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                تأكد من إدخال اسمك كما هو مكتوب في جواز السفر بالضبط
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                سيتم إرسال تحديثات الطلب على البريد الإلكتروني المسجل
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                يمكنك متابعة حالة طلبك من صفحة "حالة الطلب"
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Apply;
