import React from 'react'
export type TOrderRepsonseProps = {
  message: string;
  orderId: string;
  signature: string;
  signed_field_names: string;
  paymentMethod: string;
  email: string;
  phoneNumber: string;
  amountPaid: number;
  closeModal: () => void;
}


const EsewaForm = ({ orderDetails, closeModal }: any) => {
  return (
    <>
      <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
        <input type="text" id="amount" name="amount" placeholder="amount" value={orderDetails?.amountPaid} hidden required />
        <input type="text" id="tax_amount" name="tax_amount" placeholder="tax amount" value="0" hidden required />
        <input type="text" id="total_amount" name="total_amount" placeholder="total_amount" value={orderDetails?.amountPaid} hidden required />
        <input type="text" id="transaction_uuid" name="transaction_uuid" value={orderDetails?.orderId} hidden required />
        <input type="text" id="product_code" name="product_code" value="EPAYTEST" hidden required />
        <input type="text" id="product_service_charge" name="product_service_charge" value="0" hidden required />
        <input type="text" id="product_delivery_charge" name="product_delivery_charge" value="0" hidden required />
        <input type="text" id="success_url" name="success_url" value="http://localhost:3000/orderStatus" hidden required />
        <input type="text" id="failure_url" name="failure_url" value="https://restaurant-web-eta.vercel.app/home" hidden required />
        <input type="text" id="signed_field_names" name="signed_field_names" value={orderDetails?.signed_field_names} hidden required />
        <input type="text" id="signature" name="signature" value={orderDetails?.signature} placeholder="signature" hidden required />
        <div className='flex justify-end gap-3'>
          <button
            type='button'
            onClick={closeModal}
            className="px-2 py-1 bg-red-300 rounded-md font-semibold text-white hover:bg-primary-700"
          >
            Decline
          </button>
          <button
            type='submit'
            className="px-2 py-1 bg-green-500 rounded-md font-semibold text-white hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default EsewaForm