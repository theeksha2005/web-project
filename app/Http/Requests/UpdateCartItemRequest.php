<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateCartItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'quantity' => ['required','integer','min:1','max:99'],
        ];
    }
    
    protected function failedValidation(Validator $validator)
    {
        \Log::warning('UpdateCartItemRequest validation failed', [
            'errors' => $validator->errors()->toArray(),
            'input' => $this->all()
        ]);
        
        throw new HttpResponseException(response()->json([
            'success' => false,
            'error' => 'Validation failed',
            'errors' => $validator->errors()
        ], 422));
    }
}