import { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(String(inputValue));
    } else if (operation) {
      const currentValue = previousValue || '0';
      const newValue = calculate(parseFloat(currentValue), inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(parseFloat(previousValue), inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const handleToggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const Button = ({
    children,
    onClick,
    variant = 'default',
    className = ''
  }: {
    children: React.ReactNode;
    onClick: () => void;
    variant?: 'default' | 'operation' | 'equal' | 'clear';
    className?: string;
  }) => {
    const baseClasses = 'h-16 rounded-2xl font-medium text-xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md';
    const variants = {
      default: 'bg-white text-gray-800 hover:bg-gray-50',
      operation: 'bg-orange-500 text-white hover:bg-orange-600',
      equal: 'bg-green-500 text-white hover:bg-green-600',
      clear: 'bg-red-500 text-white hover:bg-red-600'
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl shadow-lg">
              <CalcIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Calculator</h1>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 mb-6 border border-slate-700 shadow-inner">
            <div className="text-right">
              {operation && previousValue && (
                <div className="text-slate-400 text-sm mb-1">
                  {previousValue} {operation}
                </div>
              )}
              <div className="text-white text-5xl font-light tracking-tight break-all">
                {display.length > 12 ? parseFloat(display).toExponential(6) : display}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button variant="clear" onClick={handleClear}>C</Button>
            <Button variant="default" onClick={handleToggleSign}>+/-</Button>
            <Button variant="default" onClick={handlePercentage}>%</Button>
            <Button variant="operation" onClick={() => handleOperation('÷')}>÷</Button>

            <Button variant="default" onClick={() => handleNumber('7')}>7</Button>
            <Button variant="default" onClick={() => handleNumber('8')}>8</Button>
            <Button variant="default" onClick={() => handleNumber('9')}>9</Button>
            <Button variant="operation" onClick={() => handleOperation('×')}>×</Button>

            <Button variant="default" onClick={() => handleNumber('4')}>4</Button>
            <Button variant="default" onClick={() => handleNumber('5')}>5</Button>
            <Button variant="default" onClick={() => handleNumber('6')}>6</Button>
            <Button variant="operation" onClick={() => handleOperation('-')}>-</Button>

            <Button variant="default" onClick={() => handleNumber('1')}>1</Button>
            <Button variant="default" onClick={() => handleNumber('2')}>2</Button>
            <Button variant="default" onClick={() => handleNumber('3')}>3</Button>
            <Button variant="operation" onClick={() => handleOperation('+')}>+</Button>

            <Button variant="default" className="col-span-2" onClick={() => handleNumber('0')}>0</Button>
            <Button variant="default" onClick={handleDecimal}>.</Button>
            <Button variant="equal" onClick={handleEquals}>=</Button>
          </div>
        </div>

        <div className="text-center mt-6 text-slate-400 text-sm">
          Perform basic arithmetic operations
        </div>
      </div>
    </div>
  );
}

export default App;
