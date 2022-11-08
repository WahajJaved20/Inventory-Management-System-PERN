
.data 
i WORD ?
OFFSETHOLDER DWORD ?
len DWORD ?
temp DWORD ?
.code
MAIN PROC
mov OFFSETHOLDER,esi
mov edi,esi
mov i,0

mov len,bx
mov ecx,ebx
dec ecx
mov ebx,0

OUTERLOOP :

	mov temp,cx
	mov cx,len
	dec cx
	sub cx,i

INNERLOOP:
	add edi,2
	mov ax,[edi]
	cmp [esi],ax
	jng NOSWAP

	mov bx,[esi]
	mov [esi],ax
	mov [edi],bx

	NOSWAP:
	add esi,2

loop INNERLOOP

	mov esi,OFFSETHOLDER
	mov edi,OFFSETHOLDER
	inc i
	mov cx,temp

loop OUTERLOOP

exit
MAIN ENDP
END MAIN