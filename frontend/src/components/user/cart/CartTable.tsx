import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import prd from '@/assets/prd_3.png';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const CartTable = () => {
    return (
        <>
            <div className="w-full">
                <Table>
                    <TableHeader className="">
                        <TableRow className='bg-muted/50 border-none'>
                            <TableHead className=''>Sản phẩm</TableHead>
                            <TableHead className='text-right'>Tạm tính</TableHead>
                            <TableHead className='text-right'></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        <TableRow className='border-none h-12'>
                            <TableCell>
                                <div className="flex gap-1">
                                    <img src={prd} alt="" className="h-full w-24" />
                                    <div className="font-semibold">
                                        <h3 className="text-lg">Product Name</h3>
                                        <p className="text-muted-foreground"><span>Size:</span> <span>10ml</span></p>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="icon-sm" className="cursor-pointer">-</Button>
                                            <span>1</span>
                                            <Button variant="outline" size="icon-sm" className="cursor-pointer">+</Button>
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                                10000000
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    className="cursor-pointer"
                                >
                                    <Trash2 />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default CartTable