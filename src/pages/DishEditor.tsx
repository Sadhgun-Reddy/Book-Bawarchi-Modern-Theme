import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addDishToMenu } from '../store/slices/menuSlice';
import { toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';

const DishEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { menus } = useAppSelector((state) => state.menu as any);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [images, setImages] = useState<File[]>([]);
  const [preparationTime, setPreparationTime] = useState('');
  const [serves, setServes] = useState<number | ''>('');
  const [dietaryTags, setDietaryTags] = useState<string>('');

  const menuId = menus?.[0]?._id || menus?.[0]?.id;

  useEffect(() => {
    // If there is no menu, you may want to redirect or show a message
  }, [menus]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const list: File[] = [];
    for (let i = 0; i < files.length; i++) {
      list.push(files[i]);
    }
    setImages(list);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuId) {
      toast.error('No menu found for this caterer.');
      return;
    }
    if (images.length < 3 || images.length > 5) {
      toast.error('Please upload between 3 and 5 images for the dish.');
      return;
    }
    if (!name || !price) {
      toast.error('Please provide a dish name and price.');
      return;
    }
    const dish = { name, description, price, preparationTime, serves: serves ?? undefined, dietaryTags: dietaryTags ? dietaryTags.split(',').map(s => s.trim()) : undefined };
    try {
      await dispatch(addDishToMenu({ menuId, dish, images })).unwrap();
      toast.success('Dish added successfully');
      navigate('/caterer/menus');
    } catch (err) {
      toast.error((err as string) || 'Failed to add dish');
    }
  };

  if (!menuId) {
    return <div>Loading dish editor...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Dish to Menu</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md">
        <input className="p-2 border rounded" placeholder="Dish name" value={name} onChange={(e)=>setName(e.target.value)} />
        <textarea className="p-2 border rounded" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <input className="p-2 border rounded" placeholder="Price" type="number" min={0} value={price} onChange={(e)=>setPrice(e.target.value === '' ? '' : Number(e.target.value))} />
        <input className="p-2 border rounded" placeholder="Preparation time" value={preparationTime} onChange={(e)=>setPreparationTime(e.target.value)} />
        <input className="p-2 border rounded" placeholder="Serves" type="number" value={serves} onChange={(e)=>setServes(e.target.value === '' ? '' : Number(e.target.value))} />
        <input className="p-2 border rounded" placeholder="Dietary tags (comma separated)" value={dietaryTags} onChange={(e)=>setDietaryTags(e.target.value)} />
        <input type="file" multiple accept="image/*" onChange={onFileChange} />
        <div className="text-sm text-stone-600">Note: 3-5 images required.</div>
        <button type="submit" className="bg-[#ef9d2a] text-white font-bold py-2 px-4 rounded">Add Dish</button>
      </form>
    </div>
  );
};

export default DishEditor;
