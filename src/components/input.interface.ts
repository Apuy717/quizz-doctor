export interface iInput {
  label: string;
  name: string;
  id: string;
  value: string;
  onChange: (e: string) => void;
  className?: string;
  error: string | null;
}
