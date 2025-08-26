"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trash2,
  Plus,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";

interface Transaction {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: "income" | "expense";
}

const expenseCategories = [
  "Ăn uống",
  "Di chuyển",
  "Mua sắm",
  "Giải trí",
  "Y tế",
  "Giáo dục",
  "Khác",
];
const incomeCategories = [
  "Lương",
  "Thưởng",
  "Đầu tư",
  "Bán hàng",
  "Freelance",
  "Khác",
];

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    type: "expense" as "income" | "expense",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.description || !formData.category) {
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      amount: Number.parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      type: formData.type,
      date: new Date().toLocaleDateString("vi-VN"),
    };

    setTransactions([newTransaction, ...transactions]);
    setFormData({ amount: "", description: "", category: "", type: "expense" });
    setIsDialogOpen(false);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Quản lý Thu Chi
          </h1>
          <p className="text-muted-foreground">
            Theo dõi thu nhập và chi tiêu hàng ngày
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thu nhập</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                +{totalIncome.toLocaleString("vi-VN")} đ
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chi tiêu</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                -{totalExpenses.toLocaleString("vi-VN")} đ
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Số dư</CardTitle>
              <Wallet className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  balance >= 0 ? "text-blue-600" : "text-red-600"
                }`}
              >
                {balance.toLocaleString("vi-VN")} đ
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Transaction Button */}
        <div className="mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Thêm giao dịch
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm giao dịch mới</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="type">Loại giao dịch</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "income" | "expense") =>
                      setFormData({ ...formData, type: value, category: "" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Thu nhập</SelectItem>
                      <SelectItem value="expense">Chi tiêu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="amount">Số tiền</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Mô tả</Label>
                  <Input
                    id="description"
                    placeholder={
                      formData.type === "income"
                        ? "Nhập mô tả thu nhập"
                        : "Nhập mô tả chi tiêu"
                    }
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Danh mục</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {(formData.type === "income"
                        ? incomeCategories
                        : expenseCategories
                      ).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Thêm
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Hủy
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="income">Thu nhập</TabsTrigger>
            <TabsTrigger value="expense">Chi tiêu</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {transactions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Chưa có giao dịch nào. Hãy thêm giao dịch đầu tiên của bạn!
                  </p>
                </CardContent>
              </Card>
            ) : (
              transactions.map((transaction) => (
                <Card key={transaction.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      {transaction.type === "income" ? (
                        <ArrowUpCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <ArrowDownCircle className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <h3 className="font-medium text-foreground">
                          {transaction.description}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{transaction.category}</span>
                          <span>•</span>
                          <span>{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-lg font-semibold ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {transaction.amount.toLocaleString("vi-VN")} đ
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTransaction(transaction.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="income" className="space-y-4">
            {transactions.filter((t) => t.type === "income").length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Chưa có thu nhập nào được ghi nhận.
                  </p>
                </CardContent>
              </Card>
            ) : (
              transactions
                .filter((t) => t.type === "income")
                .map((transaction) => (
                  <Card key={transaction.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <ArrowUpCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h3 className="font-medium text-foreground">
                            {transaction.description}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{transaction.category}</span>
                            <span>•</span>
                            <span>{transaction.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-green-600">
                          +{transaction.amount.toLocaleString("vi-VN")} đ
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTransaction(transaction.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>

          <TabsContent value="expense" className="space-y-4">
            {transactions.filter((t) => t.type === "expense").length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <TrendingDown className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Chưa có chi tiêu nào được ghi nhận.
                  </p>
                </CardContent>
              </Card>
            ) : (
              transactions
                .filter((t) => t.type === "expense")
                .map((transaction) => (
                  <Card key={transaction.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <ArrowDownCircle className="h-5 w-5 text-red-600" />
                        <div>
                          <h3 className="font-medium text-foreground">
                            {transaction.description}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{transaction.category}</span>
                            <span>•</span>
                            <span>{transaction.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-red-600">
                          -{transaction.amount.toLocaleString("vi-VN")} đ
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTransaction(transaction.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
