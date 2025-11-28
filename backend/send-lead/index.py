import json
import os
from typing import Dict, Any
from urllib import request, parse, error

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка заявок с сайта психолога в Telegram
    Args: event - dict with httpMethod, body (name, email, phone, message)
          context - object with request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Parse request body
    body_data = json.loads(event.get('body', '{}'))
    
    # Check if this is a test lead or contact form
    test_name = body_data.get('testName')
    
    if test_name:
        # Lead from test completion
        email = body_data.get('email', '')
        if not email:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Email обязателен'})
            }
        name = 'Не указано'
        phone = 'Не указан'
        message = f'Прошел тест: {test_name}'
    else:
        # Regular contact form
        name = body_data.get('name', '')
        email = body_data.get('email', '')
        phone = body_data.get('phone', 'Не указан')
        message = body_data.get('message', '')
        
        if not name or not email or not message:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Заполните все обязательные поля'})
            }
    
    # Get Telegram credentials from environment
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Telegram не настроен. Добавьте токен и chat_id'})
        }
    
    # Format Telegram message
    telegram_message = f"""
🔔 Новая заявка с сайта!

👤 Имя: {name}
📧 Email: {email}
📱 Телефон: {phone}

💬 Сообщение:
{message}
"""
    
    # Send to Telegram
    telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    telegram_data = {
        'chat_id': chat_id,
        'text': telegram_message,
        'parse_mode': 'HTML'
    }
    
    try:
        req = request.Request(
            telegram_url,
            data=json.dumps(telegram_data).encode('utf-8'),
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        
        with request.urlopen(req) as response:
            response_data = response.read()
            
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
        }
        
    except error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка Telegram: {error_body}'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка отправки: {str(e)}'})
        }