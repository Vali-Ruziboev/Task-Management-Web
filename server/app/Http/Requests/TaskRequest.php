<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TaskRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $routeName = $this->route()->getName();

        if (array_key_exists(0, $this->request->all())) {
            return [
                '*.id' => [Rule::requiredIf(function () use ($routeName) {
                    return 'task.bulkUpdate' == $routeName;
                }), 'numeric'],
                '*.title' => 'required|min:3',
                '*.description' => 'required|min:3',
                '*.index' => 'required|numeric',
                '*.column_id' => 'required|numeric',
            ];
        } else {
            return [
                'title' => 'required|min:3',
                'description' => 'required|min:3',
                'index' => 'required|numeric',
                'column_id' => 'required|numeric',
            ];
        }
    }
}
