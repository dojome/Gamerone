import React from 'react';
// import {
//   useForm,
//   UseFormOptions,
//   FieldValues,
//   OnSubmit,
// } from 'react-hook-form';

// export interface FormProps<FormValues extends FieldValues = FieldValues>
//   extends UseFormOptions<FormValues> {
//   children?: React.ReactNode;
//   onSubmit: OnSubmit<FormValues>;
// }

// export default function Form<FormValues extends FieldValues = FieldValues>({
//   defaultValues,
//   children,
//   onSubmit,
// }: FormProps<FormValues>) {
//   const methods = useForm<FieldValues>({ defaultValues });
//   const { handleSubmit } = methods;

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {React.Children.map(children, (child) => {
//         return child.props.name
//           ? React.createElement(child.type, {
//               ...{
//                 ...child.props,
//                 register: methods.register,
//                 key: child.props.name,
//               },
//             })
//           : child;
//       })}
//     </form>
//   );
// }

export default function SmartForm() {
  return (
    <>
      TODO; Implement smart form component{' '}
      <i>https://react-hook-form.com/advanced-usage#SmartFormComponent</i>
    </>
  );
}
