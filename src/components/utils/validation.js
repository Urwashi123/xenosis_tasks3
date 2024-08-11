import { useForm } from 'react-hook-form';

const ProductForm = () => {
  const { register, handleSubmit, errors } = useForm();
  
  const onSubmit = (data) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="productName"
        ref={register({ required: true })}
        placeholder="Product Name"
      />
      {errors.productName && <p>This field is required</p>}

      <input
        name="productPrice"
        type="number"
        ref={register({ required: true })}
        placeholder="Product Price"
      />
      {errors.productPrice && <p>This field is required</p>}

      <button type="submit">Add Product</button>
    </form>
  );
};
