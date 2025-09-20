<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
       'full_name' => ['required','string','max:150'],
        'address' => ['required','string'],
        'city' => ['required','string'],
        'postal_code' => ['nullable','string'],
        'phone' => ['required','string'],
        'payment_method' => ['required','in:cod'], // for now only Cash On Delivery
        ];
    }
}
