import { Trip } from '../../data/mock';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Wallet, TrendingDown, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';

export function BudgetTab({ trip }: { trip: Trip }) {
  const totalExpenses = trip.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = trip.budget - totalExpenses;
  const percentUsed = Math.min(100, Math.round((totalExpenses / trip.budget) * 100));

  // Prepare data for the chart
  const expensesByCategory = trip.expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['oklch(0.55 0.15 250)', 'oklch(0.7 0.15 200)', 'oklch(0.8 0.15 150)', 'oklch(0.6 0.18 20)', 'oklch(0.7 0.1 270)'];

  return (
    <div className="space-y-8">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-primary-foreground border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium opacity-90">Total Budget</h3>
              <Wallet className="h-5 w-5 opacity-80" />
            </div>
            <p className="text-3xl font-bold mb-1">₹{trip.budget.toLocaleString()}</p>
            <p className="text-sm opacity-80">Initial planned budget</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-muted-foreground">Total Spent</h3>
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            <p className="text-3xl font-bold mb-1 text-foreground">₹{totalExpenses.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">{percentUsed}% of total budget</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-muted-foreground">Remaining</h3>
              <ArrowUpRight className="h-5 w-5 text-emerald-500" />
            </div>
            <p className={`text-3xl font-bold mb-1 ${remainingBudget < 0 ? 'text-destructive' : 'text-emerald-500'}`}>
              ₹{remainingBudget.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Available to spend</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="bg-white border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between text-sm font-medium mb-3">
            <span>Budget Utilization</span>
            <span>{percentUsed}%</span>
          </div>
          <Progress value={percentUsed} className="h-3" />
          {percentUsed > 90 && (
            <p className="text-sm text-destructive mt-3 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-destructive inline-block" />
              You are approaching your budget limit.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-none shadow-sm h-[400px]">
          <CardContent className="p-6 h-full flex flex-col">
            <h3 className="font-bold text-lg mb-6">Expense Breakdown</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => `₹${value.toLocaleString()}`}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-6">Recent Expenses</h3>
            <div className="space-y-4">
              {trip.expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                      {expense.category.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">{expense.category}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(expense.date), 'MMM d, yyyy')}</p>
                    </div>
                  </div>
                  <div className="font-bold text-foreground">
                    ₹{expense.amount.toLocaleString()}
                  </div>
                </div>
              ))}
              {trip.expenses.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No expenses recorded yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
